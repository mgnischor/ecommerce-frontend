import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Registration page component.
 * Handles new user registration and account creation.
 */
@Component({
    selector: 'app-register',
    imports: [CommonModule],
    templateUrl: './register.html',
    styleUrl: './register.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Register {}
