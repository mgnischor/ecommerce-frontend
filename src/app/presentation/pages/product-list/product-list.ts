import { Component, ChangeDetectionStrategy, inject, signal, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../infrastructure/services';
import { Product, ProductCategory } from '../../../domain/models';

/**
 * Product list page component.
 * Displays a list of available products in the e-commerce catalog.
 */
@Component({
    selector: 'app-product-list',
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './product-list.html',
    styleUrl: './product-list.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductList implements OnInit {
    private productService = inject(ProductService);

    products = signal<Product[]>([]);
    isLoading = signal(false);
    error = signal<string | null>(null);

    // Pagination
    currentPage = signal(1);
    pageSize = signal(12);
    totalCount = signal(0);
    totalPages = computed(() => Math.ceil(this.totalCount() / this.pageSize()));

    // Search and Filter
    searchTerm = signal('');
    selectedCategory = signal<ProductCategory | null>(null);

    categories = Object.entries(ProductCategory)
        .filter(([key]) => isNaN(Number(key)))
        .map(([key, value]) => ({ label: key, value: value as ProductCategory }));

    ngOnInit() {
        this.loadProducts();
    }

    loadProducts() {
        this.isLoading.set(true);
        this.error.set(null);

        const searchTerm = this.searchTerm();
        const category = this.selectedCategory();

        // If searching
        if (searchTerm) {
            this.productService.searchProducts(searchTerm).subscribe({
                next: (products) => {
                    this.products.set(products);
                    this.totalCount.set(products.length);
                    this.isLoading.set(false);
                },
                error: () => {
                    this.error.set('Erro ao buscar produtos');
                    this.isLoading.set(false);
                },
            });
            return;
        }

        // If filtering by category
        if (category !== null) {
            this.productService.getProductsByCategory(category).subscribe({
                next: (products) => {
                    this.products.set(products);
                    this.totalCount.set(products.length);
                    this.isLoading.set(false);
                },
                error: () => {
                    this.error.set('Erro ao carregar produtos');
                    this.isLoading.set(false);
                },
            });
            return;
        }

        // Default: load with pagination
        this.productService.getProducts(this.currentPage(), this.pageSize()).subscribe({
            next: (data) => {
                this.products.set(data.items);
                this.totalCount.set(data.totalCount);
                this.isLoading.set(false);
            },
            error: () => {
                this.error.set('Erro ao carregar produtos');
                this.isLoading.set(false);
            },
        });
    }

    onSearch() {
        this.currentPage.set(1);
        this.selectedCategory.set(null);
        this.loadProducts();
    }

    onCategoryChange(category: ProductCategory | null) {
        this.selectedCategory.set(category);
        this.currentPage.set(1);
        this.searchTerm.set('');
        this.loadProducts();
    }

    onPageChange(page: number) {
        this.currentPage.set(page);
        this.loadProducts();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    clearFilters() {
        this.searchTerm.set('');
        this.selectedCategory.set(null);
        this.currentPage.set(1);
        this.loadProducts();
    }

    formatPrice(price: number): string {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(price);
    }

    get pageNumbers(): number[] {
        const total = this.totalPages();
        const current = this.currentPage();
        const pages: number[] = [];

        // Show max 5 page numbers
        const maxPages = 5;
        let startPage = Math.max(1, current - Math.floor(maxPages / 2));
        let endPage = Math.min(total, startPage + maxPages - 1);

        if (endPage - startPage < maxPages - 1) {
            startPage = Math.max(1, endPage - maxPages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return pages;
    }
}
