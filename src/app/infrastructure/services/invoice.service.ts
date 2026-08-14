import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Invoice, InvoicePaymentRequest, CreditNoteRequest } from '../../domain/models';

@Injectable({
    providedIn: 'root',
})
export class InvoiceService {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = `${environment.apiUrl}/invoices`;

    getInvoiceById(id: string): Observable<Invoice> {
        return this.http.get<Invoice>(`${this.baseUrl}/${id}`);
    }

    getInvoiceByNumber(invoiceNumber: string): Observable<Invoice> {
        return this.http.get<Invoice>(`${this.baseUrl}/number/${invoiceNumber}`);
    }

    createInvoice(invoice: Partial<Invoice>): Observable<Invoice> {
        return this.http.post<Invoice>(this.baseUrl, invoice);
    }

    updateInvoice(id: string, invoice: Partial<Invoice>): Observable<void> {
        return this.http.put<void>(`${this.baseUrl}/${id}`, invoice);
    }

    payInvoice(id: string, request: InvoicePaymentRequest): Observable<Invoice> {
        return this.http.post<Invoice>(`${this.baseUrl}/${id}/pay`, request);
    }

    issueCreditNote(id: string, request: CreditNoteRequest): Observable<Invoice> {
        return this.http.post<Invoice>(`${this.baseUrl}/${id}/credit-note`, request);
    }

    deleteInvoice(id: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}
