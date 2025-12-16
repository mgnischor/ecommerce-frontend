import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Order, CreateOrderRequest, UpdateOrderStatusRequest } from '../../domain/models';

@Injectable({
    providedIn: 'root',
})
export class OrderService {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = `${environment.apiUrl}/orders`;

    createOrder(request: CreateOrderRequest): Observable<Order> {
        return this.http.post<Order>(this.baseUrl, request);
    }

    getOrderById(id: string): Observable<Order> {
        return this.http.get<Order>(`${this.baseUrl}/${id}`);
    }

    updateOrderStatus(id: string, request: UpdateOrderStatusRequest): Observable<Order> {
        return this.http.patch<Order>(`${this.baseUrl}/${id}/status`, request);
    }

    cancelOrder(id: string): Observable<Order> {
        return this.http.post<Order>(`${this.baseUrl}/${id}/cancel`, {});
    }
}
