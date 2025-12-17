import { Component, ChangeDetectionStrategy, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService, ProductVariantService, CartService } from '../../../infrastructure/services';
import { Product, ProductVariant } from '../../../domain/models';

/**
 * Product detail page component.
 * Displays detailed information about a specific product.
 */
@Component({
    selector: 'app-product-detail',
    imports: [CommonModule, RouterLink],
    templateUrl: './product-detail.html',
    styleUrl: './product-detail.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetail implements OnInit {
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private productService = inject(ProductService);
    private variantService = inject(ProductVariantService);
    private cartService = inject(CartService);

    product = signal<Product | null>(null);
    variants = signal<ProductVariant[]>([]);
    selectedVariant = signal<ProductVariant | null>(null);
    quantity = signal(1);
    isLoading = signal(true);
    error = signal<string | null>(null);
    addedToCart = signal(false);

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (!id) {
            this.router.navigate(['/products']);
            return;
        }

        this.loadProduct(id);
    }

    loadProduct(id: string) {
        this.isLoading.set(true);
        this.error.set(null);

        this.productService.getProductById(id).subscribe({
            next: (product) => {
                this.product.set(product);
                this.loadVariants(id);
            },
            error: () => {
                this.error.set('Produto não encontrado');
                this.isLoading.set(false);
            },
        });
    }

    loadVariants(productId: string) {
        this.variantService.getVariantsByProductId(productId).subscribe({
            next: (variants) => {
                this.variants.set(variants);
                if (variants.length > 0) {
                    this.selectedVariant.set(variants[0]);
                }
                this.isLoading.set(false);
            },
            error: () => {
                this.isLoading.set(false);
            },
        });
    }

    selectVariant(variant: ProductVariant) {
        this.selectedVariant.set(variant);
    }

    increaseQuantity() {
        const product = this.product();
        const variant = this.selectedVariant();
        const maxStock = variant ? variant.stockQuantity : product?.stockQuantity || 0;

        if (this.quantity() < maxStock) {
            this.quantity.update((q) => q + 1);
        }
    }

    decreaseQuantity() {
        if (this.quantity() > 1) {
            this.quantity.update((q) => q - 1);
        }
    }

    addToCart() {
        const product = this.product();
        if (!product) return;

        const variant = this.selectedVariant();
        const price = variant?.price || product.salePrice || product.price;

        this.cartService.addItem(
            {
                productId: product.id,
                productVariantId: variant?.id,
                name: variant?.name || product.name,
                price,
                imageUrl: variant?.imageUrl || product.imageUrl,
                sku: variant?.sku || product.sku,
            },
            this.quantity()
        );

        this.addedToCart.set(true);
        setTimeout(() => this.addedToCart.set(false), 3000);
    }

    formatPrice(price: number): string {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(price);
    }

    get currentPrice(): number {
        const product = this.product();
        if (!product) return 0;

        const variant = this.selectedVariant();
        return variant?.price || product.salePrice || product.price;
    }

    get originalPrice(): number {
        const product = this.product();
        if (!product) return 0;

        return product.isOnSale ? product.price : 0;
    }

    get currentStock(): number {
        const product = this.product();
        if (!product) return 0;

        const variant = this.selectedVariant();
        return variant?.stockQuantity || product.stockQuantity;
    }

    get isInStock(): boolean {
        return this.currentStock > 0;
    }
}
