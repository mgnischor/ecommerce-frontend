import { Component, ChangeDetectionStrategy } from '@angular/core';

/**
 * Footer component.
 * Displays the application footer with copyright and links.
 */
@Component({
    selector: 'app-footer',
    imports: [],
    templateUrl: './footer.html',
    styleUrl: './footer.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
    currentYear = new Date().getFullYear();
}
