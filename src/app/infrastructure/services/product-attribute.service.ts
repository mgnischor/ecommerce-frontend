import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ProductAttribute } from '../../domain/models';

@Injectable({
    providedIn: 'root',
})
export class ProductAttributeService {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = `${environment.apiUrl}/product-attributes`;

    getAllAttributes(): Observable<ProductAttribute[]> {
        return this.http.get<ProductAttribute[]>(this.baseUrl);
    }

    getAttributeById(id: string): Observable<ProductAttribute> {
        return this.http.get<ProductAttribute>(`${this.baseUrl}/${id}`);
    }

    getAttributeByCode(code: string): Observable<ProductAttribute> {
        return this.http.get<ProductAttribute>(`${this.baseUrl}/code/${code}`);
    }

    getVariantAttributes(): Observable<ProductAttribute[]> {
        return this.http.get<ProductAttribute[]>(`${this.baseUrl}/variant`);
    }

    createAttribute(attribute: Partial<ProductAttribute>): Observable<ProductAttribute> {
        return this.http.post<ProductAttribute>(this.baseUrl, attribute);
    }

    updateAttribute(id: string, attribute: Partial<ProductAttribute>): Observable<void> {
        return this.http.put<void>(`${this.baseUrl}/${id}`, attribute);
    }

    deleteAttribute(id: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}
