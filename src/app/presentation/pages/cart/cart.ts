import { Component, ChangeDetectionStrategy, inject } from '@angular/core';

import { RouterLink } from '@angular/router';
import { CartService } from '../../../infrastructure/services';
import { TranslateService, TranslatePipe } from '../../../infrastructure/i18n';

/**
 * Shopping cart page component.
 * Displays the user's shopping cart with selected items.
 */
@Component({
    selector: 'app-cart',
    imports: [RouterLink, TranslatePipe],
    templateUrl: './cart.html',
    styleUrl: './cart.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Cart {
    cartService = inject(CartService);
    private readonly t = inject(TranslateService);

    updateQuantity(productId: string, productVariantId: string | undefined, quantity: number) {
        this.cartService.updateQuantity(productId, productVariantId, quantity);
    }

    removeItem(productId: string, productVariantId?: string) {
        this.cartService.removeItem(productId, productVariantId);
    }

    clearCart() {
        if (confirm(this.t.get('cart.confirmClear'))) {
            this.cartService.clearCart();
        }
    }

    formatPrice(price: number): string {
        return this.t.formatPrice(price);
    }
}
