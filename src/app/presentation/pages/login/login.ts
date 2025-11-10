import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Login page component.
 * Handles user authentication and login functionality.
 */
@Component({
    selector: 'app-login',
    imports: [CommonModule],
    templateUrl: './login.html',
    styleUrl: './login.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {}
