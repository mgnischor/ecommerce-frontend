import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { InventoryTransaction, RecordInventoryTransactionRequest } from '../../domain/models';

@Injectable({
    providedIn: 'root',
})
export class InventoryService {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = `${environment.apiUrl}/inventory-transactions`;

    createTransaction(request: RecordInventoryTransactionRequest): Observable<InventoryTransaction> {
        return this.http.post<InventoryTransaction>(this.baseUrl, request);
    }

    getTransactionById(id: string): Observable<InventoryTransaction> {
        return this.http.get<InventoryTransaction>(`${this.baseUrl}/${id}`);
    }

    getTransactionsByProductId(productId: string): Observable<InventoryTransaction[]> {
        return this.http.get<InventoryTransaction[]>(`${this.baseUrl}/product/${productId}`);
    }

    getTransactionsByPeriod(startDate: string, endDate: string): Observable<InventoryTransaction[]> {
        return this.http.get<InventoryTransaction[]>(`${this.baseUrl}/period`, {
            params: { startDate, endDate },
        });
    }
}
