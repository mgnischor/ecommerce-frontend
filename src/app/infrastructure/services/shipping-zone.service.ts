import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ShippingZone } from '../../domain/models';

@Injectable({
    providedIn: 'root',
})
export class ShippingZoneService {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = `${environment.apiUrl}/shipping-zones`;

    getShippingZones(): Observable<ShippingZone[]> {
        return this.http.get<ShippingZone[]>(this.baseUrl);
    }

    getShippingZoneById(id: string): Observable<ShippingZone> {
        return this.http.get<ShippingZone>(`${this.baseUrl}/${id}`);
    }

    createShippingZone(zone: Partial<ShippingZone>): Observable<ShippingZone> {
        return this.http.post<ShippingZone>(this.baseUrl, zone);
    }

    updateShippingZone(id: string, zone: Partial<ShippingZone>): Observable<void> {
        return this.http.put<void>(`${this.baseUrl}/${id}`, zone);
    }

    deleteShippingZone(id: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}
