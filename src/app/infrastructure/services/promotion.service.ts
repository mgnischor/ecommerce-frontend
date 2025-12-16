import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Promotion } from '../../domain/models';

@Injectable({
    providedIn: 'root',
})
export class PromotionService {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = `${environment.apiUrl}/promotions`;

    getAllPromotions(): Observable<Promotion[]> {
        return this.http.get<Promotion[]>(this.baseUrl);
    }

    getPromotionById(id: string): Observable<Promotion> {
        return this.http.get<Promotion>(`${this.baseUrl}/${id}`);
    }

    getPromotionByCode(code: string): Observable<Promotion> {
        return this.http.get<Promotion>(`${this.baseUrl}/code/${code}`);
    }

    getFeaturedPromotions(): Observable<Promotion[]> {
        return this.http.get<Promotion[]>(`${this.baseUrl}/featured`);
    }

    createPromotion(promotion: Partial<Promotion>): Observable<Promotion> {
        return this.http.post<Promotion>(this.baseUrl, promotion);
    }

    updatePromotion(id: string, promotion: Partial<Promotion>): Observable<void> {
        return this.http.put<void>(`${this.baseUrl}/${id}`, promotion);
    }

    deletePromotion(id: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}
