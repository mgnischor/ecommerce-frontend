import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';

import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
    AbstractControl,
    ValidationErrors,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../infrastructure/services';
import { TranslateService, TranslatePipe } from '../../../infrastructure/i18n';
import { UserAccessLevel } from '../../../domain/models';

/**
 * Registration page component.
 * Handles new user registration and account creation.
 */
@Component({
    selector: 'app-register',
    imports: [ReactiveFormsModule, RouterLink, TranslatePipe],
    templateUrl: './register.html',
    styleUrl: './register.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Register {
    private readonly userService = inject(UserService);
    private readonly router = inject(Router);
    private readonly t = inject(TranslateService);

    isLoading = signal(false);
    errorMessage = signal<string | null>(null);
    successMessage = signal<string | null>(null);

    registerForm = new FormGroup(
        {
            firstName: new FormControl('', [Validators.required]),
            lastName: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required, Validators.email]),
            phoneNumber: new FormControl(''),
            password: new FormControl('', [Validators.required, Validators.minLength(6)]),
            confirmPassword: new FormControl('', [Validators.required]),
        },
        { validators: this.passwordMatchValidator },
    );

    passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
        const password = control.get('password')?.value;
        const confirmPassword = control.get('confirmPassword')?.value;
        return password === confirmPassword ? null : { passwordMismatch: true };
    }

    onSubmit() {
        if (this.registerForm.invalid) {
            this.registerForm.markAllAsTouched();
            return;
        }

        this.isLoading.set(true);
        this.errorMessage.set(null);
        this.successMessage.set(null);

        const { firstName, lastName, email, phoneNumber } = this.registerForm.value;

        this.userService
            .createUser({
                firstName: firstName!,
                lastName: lastName!,
                email: email!,
                phoneNumber: phoneNumber || undefined,
                accessLevel: UserAccessLevel.Customer,
                isActive: true,
            })
            .subscribe({
                next: () => {
                    this.isLoading.set(false);
                    this.successMessage.set(this.t.get('register.success'));
                    setTimeout(() => {
                        this.router.navigate(['/login']);
                    }, 2000);
                },
                error: (error) => {
                    this.isLoading.set(false);
                    if (error.status === 409) {
                        this.errorMessage.set(this.t.get('register.emailAlreadyExists'));
                    } else {
                        this.errorMessage.set(this.t.get('register.genericError'));
                    }
                },
            });
    }

    get firstNameControl() {
        return this.registerForm.get('firstName');
    }

    get lastNameControl() {
        return this.registerForm.get('lastName');
    }

    get emailControl() {
        return this.registerForm.get('email');
    }

    get phoneControl() {
        return this.registerForm.get('phoneNumber');
    }

    get passwordControl() {
        return this.registerForm.get('password');
    }

    get confirmPasswordControl() {
        return this.registerForm.get('confirmPassword');
    }
}
