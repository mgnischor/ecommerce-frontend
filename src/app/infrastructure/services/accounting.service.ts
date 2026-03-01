import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ChartOfAccounts, JournalEntry } from '../../domain/models';

@Injectable({
    providedIn: 'root',
})
export class AccountingService {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = `${environment.apiUrl}/accounting`;

    getChartOfAccounts(): Observable<ChartOfAccounts[]> {
        return this.http.get<ChartOfAccounts[]>(`${this.baseUrl}/chart-of-accounts`);
    }

    getChartOfAccountsById(id: string): Observable<ChartOfAccounts> {
        return this.http.get<ChartOfAccounts>(`${this.baseUrl}/chart-of-accounts/${id}`);
    }

    getJournalEntries(pageNumber = 1, pageSize = 10): Observable<JournalEntry[]> {
        const params = new HttpParams().set('pageNumber', pageNumber.toString()).set('pageSize', pageSize.toString());
        return this.http.get<JournalEntry[]>(`${this.baseUrl}/journal-entries`, { params });
    }

    getJournalEntryById(id: string): Observable<JournalEntry> {
        return this.http.get<JournalEntry>(`${this.baseUrl}/journal-entries/${id}`);
    }

    getJournalEntriesByProductId(productId: string): Observable<JournalEntry[]> {
        return this.http.get<JournalEntry[]>(`${this.baseUrl}/journal-entries/product/${productId}`);
    }
}
