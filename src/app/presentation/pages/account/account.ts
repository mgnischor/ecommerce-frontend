import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * User account page component.
 * Displays and manages user account information and settings.
 */
@Component({
    selector: 'page-account',
    imports: [CommonModule],
    templateUrl: './account.html',
    styleUrl: './account.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Account {}
