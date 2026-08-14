import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Customer, CustomerSegment } from '../../domain/models';

@Injectable({
    providedIn: 'root',
})
export class CustomerService {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = `${environment.apiUrl}/customers`;

    getCustomerById(id: string): Observable<Customer> {
        return this.http.get<Customer>(`${this.baseUrl}/${id}`);
    }

    getCustomerByUserId(userId: string): Observable<Customer> {
        return this.http.get<Customer>(`${this.baseUrl}/user/${userId}`);
    }

    createCustomer(customer: Partial<Customer>): Observable<Customer> {
        return this.http.post<Customer>(this.baseUrl, customer);
    }

    updateCustomer(id: string, customer: Partial<Customer>): Observable<void> {
        return this.http.put<void>(`${this.baseUrl}/${id}`, customer);
    }

    getCustomerSegment(id: string): Observable<CustomerSegment> {
        return this.http.get<CustomerSegment>(`${this.baseUrl}/${id}/segment`);
    }

    deleteCustomer(id: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}
