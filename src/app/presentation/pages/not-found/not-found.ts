import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * 404 Not Found page component.
 * Displays when users navigate to non-existent routes.
 */
@Component({
    selector: 'page-not-found',
    imports: [CommonModule],
    templateUrl: './not-found.html',
    styleUrl: './not-found.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFound {}
