import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Vendor, PaginatedVendors } from '../../domain/models';

@Injectable({
    providedIn: 'root',
})
export class VendorService {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = `${environment.apiUrl}/vendors`;

    getVendors(pageNumber = 1, pageSize = 10): Observable<PaginatedVendors> {
        const params = new HttpParams().set('pageNumber', pageNumber.toString()).set('pageSize', pageSize.toString());

        return this.http.get<PaginatedVendors>(this.baseUrl, { params });
    }

    getVendorById(id: string): Observable<Vendor> {
        return this.http.get<Vendor>(`${this.baseUrl}/${id}`);
    }

    getFeaturedVendors(): Observable<Vendor[]> {
        return this.http.get<Vendor[]>(`${this.baseUrl}/featured`);
    }

    searchVendors(searchTerm: string): Observable<Vendor[]> {
        const params = new HttpParams().set('searchTerm', searchTerm);
        return this.http.get<Vendor[]>(`${this.baseUrl}/search`, { params });
    }

    createVendor(vendor: Partial<Vendor>): Observable<Vendor> {
        return this.http.post<Vendor>(this.baseUrl, vendor);
    }
}
