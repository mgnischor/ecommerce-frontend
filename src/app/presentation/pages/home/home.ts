import { Component, ChangeDetectionStrategy, inject, signal, OnInit } from '@angular/core';

import { RouterLink } from '@angular/router';
import { ProductService, PromotionService } from '../../../infrastructure/services';
import { TranslateService, TranslatePipe } from '../../../infrastructure/i18n';
import { Product, Promotion } from '../../../domain/models';

/**
 * Home page component.
 * Displays the main landing page of the e-commerce application.
 */
@Component({
    selector: 'app-home',
    imports: [RouterLink, TranslatePipe],
    templateUrl: './home.html',
    styleUrl: './home.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home implements OnInit {
    private readonly productService = inject(ProductService);
    private readonly promotionService = inject(PromotionService);
    readonly t = inject(TranslateService);

    featuredProducts = signal<Product[]>([]);
    onSaleProducts = signal<Product[]>([]);
    featuredPromotions = signal<Promotion[]>([]);
    isLoading = signal(true);
    error = signal<string | null>(null);

    ngOnInit() {
        this.loadData();
    }

    loadData() {
        this.isLoading.set(true);
        this.error.set(null);

        // Load featured products
        this.productService.getFeaturedProducts().subscribe({
            next: (products) => {
                this.featuredProducts.set(products);
            },
            error: () => {
                this.error.set(this.t.get('home.errorLoadingProducts'));
            },
        });

        // Load on sale products
        this.productService.getOnSaleProducts().subscribe({
            next: (products) => {
                this.onSaleProducts.set(products);
            },
            error: () => {
                // Silent fail for on sale products
            },
        });

        // Load featured promotions
        this.promotionService.getFeaturedPromotions().subscribe({
            next: (promotions) => {
                this.featuredPromotions.set(promotions);
                this.isLoading.set(false);
            },
            error: () => {
                this.isLoading.set(false);
            },
        });
    }

    formatPrice(price: number): string {
        return this.t.formatPrice(price);
    }
}
