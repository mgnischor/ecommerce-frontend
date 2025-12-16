import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ProductVariant } from '../../domain/models';

@Injectable({
    providedIn: 'root',
})
export class ProductVariantService {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = `${environment.apiUrl}/product-variants`;

    getVariantsByProductId(productId: string): Observable<ProductVariant[]> {
        return this.http.get<ProductVariant[]>(`${this.baseUrl}/product/${productId}`);
    }

    getVariantById(id: string): Observable<ProductVariant> {
        return this.http.get<ProductVariant>(`${this.baseUrl}/${id}`);
    }

    getVariantBySku(sku: string): Observable<ProductVariant> {
        return this.http.get<ProductVariant>(`${this.baseUrl}/sku/${sku}`);
    }

    createVariant(variant: Partial<ProductVariant>): Observable<ProductVariant> {
        return this.http.post<ProductVariant>(this.baseUrl, variant);
    }

    updateVariant(id: string, variant: Partial<ProductVariant>): Observable<void> {
        return this.http.put<void>(`${this.baseUrl}/${id}`, variant);
    }

    deleteVariant(id: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}
