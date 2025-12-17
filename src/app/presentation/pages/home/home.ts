import { Component, ChangeDetectionStrategy, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService, PromotionService } from '../../../infrastructure/services';
import { Product, Promotion } from '../../../domain/models';

/**
 * Home page component.
 * Displays the main landing page of the e-commerce application.
 */
@Component({
    selector: 'app-home',
    imports: [CommonModule, RouterLink],
    templateUrl: './home.html',
    styleUrl: './home.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home implements OnInit {
    private productService = inject(ProductService);
    private promotionService = inject(PromotionService);

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
                this.error.set('Erro ao carregar produtos em destaque');
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
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(price);
    }
}
