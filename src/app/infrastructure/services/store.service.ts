import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Store } from '../../domain/models';

@Injectable({
    providedIn: 'root',
})
export class StoreService {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = `${environment.apiUrl}/stores`;

    getStores(): Observable<Store[]> {
        return this.http.get<Store[]>(this.baseUrl);
    }

    getStoreById(id: string): Observable<Store> {
        return this.http.get<Store>(`${this.baseUrl}/${id}`);
    }

    getStoreByCode(code: string): Observable<Store> {
        return this.http.get<Store>(`${this.baseUrl}/code/${code}`);
    }

    searchStoresByCity(city: string): Observable<Store[]> {
        return this.http.get<Store[]>(`${this.baseUrl}/search/city/${city}`);
    }

    createStore(store: Partial<Store>): Observable<Store> {
        return this.http.post<Store>(this.baseUrl, store);
    }

    updateStore(id: string, store: Partial<Store>): Observable<void> {
        return this.http.put<void>(`${this.baseUrl}/${id}`, store);
    }

    deleteStore(id: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}
