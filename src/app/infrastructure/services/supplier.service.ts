import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Supplier } from '../../domain/models';

@Injectable({
    providedIn: 'root',
})
export class SupplierService {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = `${environment.apiUrl}/suppliers`;

    getSuppliers(): Observable<Supplier[]> {
        return this.http.get<Supplier[]>(this.baseUrl);
    }

    getSupplierById(id: string): Observable<Supplier> {
        return this.http.get<Supplier>(`${this.baseUrl}/${id}`);
    }

    getSupplierByCode(code: string): Observable<Supplier> {
        return this.http.get<Supplier>(`${this.baseUrl}/code/${code}`);
    }

    searchSuppliers(searchTerm: string): Observable<Supplier[]> {
        const params = new HttpParams().set('searchTerm', searchTerm);
        return this.http.get<Supplier[]>(`${this.baseUrl}/search`, { params });
    }

    createSupplier(supplier: Partial<Supplier>): Observable<Supplier> {
        return this.http.post<Supplier>(this.baseUrl, supplier);
    }

    updateSupplier(id: string, supplier: Partial<Supplier>): Observable<void> {
        return this.http.put<void>(`${this.baseUrl}/${id}`, supplier);
    }

    deleteSupplier(id: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}
