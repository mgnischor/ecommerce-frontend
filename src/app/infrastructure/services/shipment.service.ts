import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Shipment, PaginatedShipments } from '../../domain/models';

@Injectable({
    providedIn: 'root',
})
export class ShipmentService {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = `${environment.apiUrl}/shipments`;

    getShipments(pageNumber = 1, pageSize = 10): Observable<PaginatedShipments> {
        const params = new HttpParams().set('pageNumber', pageNumber.toString()).set('pageSize', pageSize.toString());

        return this.http.get<PaginatedShipments>(this.baseUrl, { params });
    }

    getShipmentById(id: string): Observable<Shipment> {
        return this.http.get<Shipment>(`${this.baseUrl}/${id}`);
    }

    getShipmentsByOrderId(orderId: string): Observable<Shipment[]> {
        return this.http.get<Shipment[]>(`${this.baseUrl}/order/${orderId}`);
    }

    getShipmentByTrackingNumber(trackingNumber: string): Observable<Shipment> {
        return this.http.get<Shipment>(`${this.baseUrl}/tracking/${trackingNumber}`);
    }

    createShipment(shipment: Partial<Shipment>): Observable<Shipment> {
        return this.http.post<Shipment>(this.baseUrl, shipment);
    }

    updateShipment(id: string, shipment: Partial<Shipment>): Observable<void> {
        return this.http.put<void>(`${this.baseUrl}/${id}`, shipment);
    }

    deleteShipment(id: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}
