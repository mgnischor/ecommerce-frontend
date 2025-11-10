import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Orders page component.
 * Displays the user's order history and order details.
 */
@Component({
    selector: 'app-orders',
    imports: [CommonModule],
    templateUrl: './orders.html',
    styleUrl: './orders.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Orders {}
