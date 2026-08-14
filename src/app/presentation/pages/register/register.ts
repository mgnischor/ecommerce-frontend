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
 *
 * Note: the backend exposes user creation via POST /users which expects
 * a UserEntity payload (username, email, password). This endpoint requires
 * an authenticated session; self-registration is not publicly available.
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
            username: new FormControl('', [Validators.required, Validators.minLength(3)]),
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [
                Validators.required,
                Validators.minLength(8),
            ]),
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

        const { username, email, password } = this.registerForm.value;

        this.userService
            .createUser({
                username: username!,
                email: email!,
                password: password!,
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
                    } else if (error.status === 401) {
                        this.errorMessage.set(this.t.get('register.authRequired'));
                    } else {
                        this.errorMessage.set(this.t.get('register.genericError'));
                    }
                },
            });
    }

    get usernameControl() {
        return this.registerForm.get('username');
    }

    get emailControl() {
        return this.registerForm.get('email');
    }

    get passwordControl() {
        return this.registerForm.get('password');
    }

    get confirmPasswordControl() {
        return this.registerForm.get('confirmPassword');
    }
}
