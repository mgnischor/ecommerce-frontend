import { Component, ChangeDetectionStrategy } from '@angular/core';

/**
 * 404 Not Found page component.
 * Displays when users navigate to non-existent routes.
 */
@Component({
    selector: 'app-not-found',
    imports: [],
    templateUrl: './not-found.html',
    styleUrl: './not-found.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFound {}
