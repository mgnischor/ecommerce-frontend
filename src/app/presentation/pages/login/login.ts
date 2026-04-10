import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';

import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../infrastructure/services';
import { TranslateService, TranslatePipe } from '../../../infrastructure/i18n';

/**
 * Login page component.
 * Handles user authentication and login functionality.
 */
@Component({
    selector: 'app-login',
    imports: [ReactiveFormsModule, RouterLink, TranslatePipe],
    templateUrl: './login.html',
    styleUrl: './login.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
    private readonly authService = inject(AuthService);
    private readonly router = inject(Router);
    private readonly t = inject(TranslateService);

    isLoading = signal(false);
    errorMessage = signal<string | null>(null);

    loginForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    });

    onSubmit() {
        if (this.loginForm.invalid) {
            this.loginForm.markAllAsTouched();
            return;
        }

        this.isLoading.set(true);
        this.errorMessage.set(null);

        const { email, password } = this.loginForm.value;

        this.authService
            .login({
                email: email!,
                password: password!,
            })
            .subscribe({
                next: () => {
                    this.isLoading.set(false);
                    this.router.navigate(['/']);
                },
                error: (error) => {
                    this.isLoading.set(false);
                    if (error.status === 401) {
                        this.errorMessage.set(this.t.get('login.invalidCredentials'));
                    } else if (error.status === 429) {
                        this.errorMessage.set(this.t.get('login.tooManyAttempts'));
                    } else {
                        this.errorMessage.set(this.t.get('login.genericError'));
                    }
                },
            });
    }

    get emailControl() {
        return this.loginForm.get('email');
    }

    get passwordControl() {
        return this.loginForm.get('password');
    }
}
