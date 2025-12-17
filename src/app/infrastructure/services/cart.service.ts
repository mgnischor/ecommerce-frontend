import { Injectable, signal, computed } from '@angular/core';

export interface CartItem {
    productId: string;
    productVariantId?: string;
    name: string;
    price: number;
    quantity: number;
    imageUrl?: string;
    sku: string;
}

@Injectable({
    providedIn: 'root',
})
export class CartService {
    private readonly storageKey = 'shopping_cart';

    private items = signal<CartItem[]>(this.loadFromStorage());

    // Computed values
    cartItems = this.items.asReadonly();
    itemCount = computed(() => this.items().reduce((total, item) => total + item.quantity, 0));
    subtotal = computed(() => this.items().reduce((total, item) => total + item.price * item.quantity, 0));

    addItem(item: Omit<CartItem, 'quantity'>, quantity = 1) {
        const currentItems = this.items();
        const existingItemIndex = currentItems.findIndex(
            (i) => i.productId === item.productId && i.productVariantId === item.productVariantId
        );

        if (existingItemIndex >= 0) {
            // Update quantity if item already exists
            const updatedItems = [...currentItems];
            updatedItems[existingItemIndex] = {
                ...updatedItems[existingItemIndex],
                quantity: updatedItems[existingItemIndex].quantity + quantity,
            };
            this.items.set(updatedItems);
        } else {
            // Add new item
            this.items.set([...currentItems, { ...item, quantity }]);
        }

        this.saveToStorage();
    }

    updateQuantity(productId: string, productVariantId: string | undefined, quantity: number) {
        if (quantity <= 0) {
            this.removeItem(productId, productVariantId);
            return;
        }

        const currentItems = this.items();
        const updatedItems = currentItems.map((item) => {
            if (item.productId === productId && item.productVariantId === productVariantId) {
                return { ...item, quantity };
            }
            return item;
        });

        this.items.set(updatedItems);
        this.saveToStorage();
    }

    removeItem(productId: string, productVariantId?: string) {
        const currentItems = this.items();
        const filteredItems = currentItems.filter(
            (item) => !(item.productId === productId && item.productVariantId === productVariantId)
        );

        this.items.set(filteredItems);
        this.saveToStorage();
    }

    clearCart() {
        this.items.set([]);
        this.saveToStorage();
    }

    private loadFromStorage(): CartItem[] {
        if (typeof window === 'undefined') {
            return [];
        }

        try {
            const stored = localStorage.getItem(this.storageKey);
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    }

    private saveToStorage() {
        if (typeof window === 'undefined') {
            return;
        }

        localStorage.setItem(this.storageKey, JSON.stringify(this.items()));
    }
}
