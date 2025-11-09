import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Shopping cart page component.
 * Displays the user's shopping cart with selected items.
 */
@Component({
    selector: 'page-cart',
    imports: [CommonModule],
    templateUrl: './cart.html',
    styleUrl: './cart.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Cart {}
