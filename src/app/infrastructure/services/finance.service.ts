import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
    FinancialTransaction,
    CashFlowReport,
    AccountsReceivable,
    AccountsPayable,
    FinancialDashboard,
    ReconcileTransactionRequest,
} from '../../domain/models';

@Injectable({
    providedIn: 'root',
})
export class FinanceService {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = `${environment.apiUrl}/finance`;

    getTransactions(pageNumber = 1, pageSize = 10): Observable<FinancialTransaction[]> {
        const params = new HttpParams().set('pageNumber', pageNumber.toString()).set('pageSize', pageSize.toString());
        return this.http.get<FinancialTransaction[]>(`${this.baseUrl}/transactions`, { params });
    }

    getTransactionById(id: string): Observable<FinancialTransaction> {
        return this.http.get<FinancialTransaction>(`${this.baseUrl}/transactions/${id}`);
    }

    getTransactionsByPeriod(startDate: string, endDate: string): Observable<FinancialTransaction[]> {
        const params = new HttpParams().set('startDate', startDate).set('endDate', endDate);
        return this.http.get<FinancialTransaction[]>(`${this.baseUrl}/transactions/period`, { params });
    }

    getUnreconciledTransactions(): Observable<FinancialTransaction[]> {
        return this.http.get<FinancialTransaction[]>(`${this.baseUrl}/transactions/unreconciled`);
    }

    getTransactionsByOrderId(orderId: string): Observable<FinancialTransaction[]> {
        return this.http.get<FinancialTransaction[]>(`${this.baseUrl}/transactions/order/${orderId}`);
    }

    getCashFlowReport(startDate: string, endDate: string): Observable<CashFlowReport> {
        const params = new HttpParams().set('startDate', startDate).set('endDate', endDate);
        return this.http.get<CashFlowReport>(`${this.baseUrl}/cash-flow`, { params });
    }

    getAccountsReceivable(): Observable<AccountsReceivable> {
        return this.http.get<AccountsReceivable>(`${this.baseUrl}/accounts-receivable`);
    }

    getAccountsPayable(): Observable<AccountsPayable> {
        return this.http.get<AccountsPayable>(`${this.baseUrl}/accounts-payable`);
    }

    getDashboard(startDate: string, endDate: string): Observable<FinancialDashboard> {
        const params = new HttpParams().set('startDate', startDate).set('endDate', endDate);
        return this.http.get<FinancialDashboard>(`${this.baseUrl}/dashboard`, { params });
    }

    reconcileTransaction(id: string, request: ReconcileTransactionRequest): Observable<void> {
        return this.http.post<void>(`${this.baseUrl}/transactions/${id}/reconcile`, request);
    }
}
