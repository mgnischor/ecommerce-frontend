import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Payment, ProcessPaymentRequest, RefundPaymentRequest } from '../../domain/models';

@Injectable({
    providedIn: 'root',
})
export class PaymentService {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = `${environment.apiUrl}/payments`;

    processPayment(request: ProcessPaymentRequest): Observable<Payment> {
        return this.http.post<Payment>(`${this.baseUrl}/process`, request);
    }

    refundPayment(id: string, request: RefundPaymentRequest): Observable<Payment> {
        return this.http.post<Payment>(`${this.baseUrl}/${id}/refund`, request);
    }

    getPaymentById(id: string): Observable<Payment> {
        return this.http.get<Payment>(`${this.baseUrl}/${id}`);
    }

    getPaymentByOrderId(orderId: string): Observable<Payment> {
        return this.http.get<Payment>(`${this.baseUrl}/order/${orderId}`);
    }
}
