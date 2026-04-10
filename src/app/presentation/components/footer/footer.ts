import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TranslatePipe } from '../../../infrastructure/i18n';

/**
 * Footer component.
 * Displays the application footer with copyright and links.
 */
@Component({
    selector: 'app-footer',
    imports: [TranslatePipe],
    templateUrl: './footer.html',
    styleUrl: './footer.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
    currentYear = new Date().getFullYear();
}
