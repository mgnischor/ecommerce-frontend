import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
    Refund,
    PaginatedRefunds,
    CreateRefundRequest,
    RejectRefundRequest,
} from '../../domain/models';
import { parsePagedResponse } from './pagination.util';

@Injectable({
    providedIn: 'root',
})
export class RefundService {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = `${environment.apiUrl}/refunds`;

    getRefunds(pageNumber = 1, pageSize = 10): Observable<PaginatedRefunds> {
        const params = new HttpParams()
            .set('pageNumber', pageNumber.toString())
            .set('pageSize', pageSize.toString());

        return this.http
            .get<Refund[]>(this.baseUrl, { params, observe: 'response' })
            .pipe(map((response) => parsePagedResponse(response, pageNumber, pageSize)));
    }

    getRefundById(id: string): Observable<Refund> {
        return this.http.get<Refund>(`${this.baseUrl}/${id}`);
    }

    getRefundsByOrderId(orderId: string): Observable<Refund[]> {
        return this.http.get<Refund[]>(`${this.baseUrl}/order/${orderId}`);
    }

    getRefundsByCustomerId(customerId: string): Observable<Refund[]> {
        return this.http.get<Refund[]>(`${this.baseUrl}/customer/${customerId}`);
    }

    createRefund(request: CreateRefundRequest): Observable<Refund> {
        return this.http.post<Refund>(this.baseUrl, request);
    }

    updateRefund(id: string, refund: Partial<Refund>): Observable<void> {
        return this.http.put<void>(`${this.baseUrl}/${id}`, refund);
    }

    deleteRefund(id: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }

    approveRefund(id: string): Observable<void> {
        return this.http.patch<void>(`${this.baseUrl}/${id}/approve`, {});
    }

    rejectRefund(id: string, request: RejectRefundRequest): Observable<void> {
        return this.http.patch<void>(`${this.baseUrl}/${id}/reject`, request.reason);
    }
}
