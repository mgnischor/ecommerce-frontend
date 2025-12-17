import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../infrastructure/services';

/**
 * Shopping cart page component.
 * Displays the user's shopping cart with selected items.
 */
@Component({
    selector: 'app-cart',
    imports: [CommonModule, RouterLink],
    templateUrl: './cart.html',
    styleUrl: './cart.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Cart {
    cartService = inject(CartService);

    updateQuantity(productId: string, productVariantId: string | undefined, quantity: number) {
        this.cartService.updateQuantity(productId, productVariantId, quantity);
    }

    removeItem(productId: string, productVariantId?: string) {
        this.cartService.removeItem(productId, productVariantId);
    }

    clearCart() {
        if (confirm('Tem certeza que deseja limpar o carrinho?')) {
            this.cartService.clearCart();
        }
    }

    formatPrice(price: number): string {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(price);
    }
}
