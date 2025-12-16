import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Product, PaginatedProducts, ProductCategory } from '../../domain/models';

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = `${environment.apiUrl}/products`;

    getProducts(pageNumber = 1, pageSize = 10): Observable<PaginatedProducts> {
        const params = new HttpParams().set('pageNumber', pageNumber.toString()).set('pageSize', pageSize.toString());

        return this.http.get<PaginatedProducts>(this.baseUrl, { params });
    }

    getProductById(id: string): Observable<Product> {
        return this.http.get<Product>(`${this.baseUrl}/${id}`);
    }

    getProductBySku(sku: string): Observable<Product> {
        return this.http.get<Product>(`${this.baseUrl}/sku/${sku}`);
    }

    getProductsByCategory(category: ProductCategory): Observable<Product[]> {
        return this.http.get<Product[]>(`${this.baseUrl}/category/${category}`);
    }

    getFeaturedProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(`${this.baseUrl}/featured`);
    }

    getOnSaleProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(`${this.baseUrl}/on-sale`);
    }

    searchProducts(searchTerm: string): Observable<Product[]> {
        const params = new HttpParams().set('searchTerm', searchTerm);
        return this.http.get<Product[]>(`${this.baseUrl}/search`, { params });
    }

    createProduct(product: Partial<Product>): Observable<Product> {
        return this.http.post<Product>(this.baseUrl, product);
    }

    updateProduct(id: string, product: Partial<Product>): Observable<void> {
        return this.http.put<void>(`${this.baseUrl}/${id}`, product);
    }

    deleteProduct(id: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }

    softDeleteProduct(id: string): Observable<void> {
        return this.http.patch<void>(`${this.baseUrl}/${id}/soft-delete`, {});
    }
}
