import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
    GiftCard,
    GiftCardRedeemRequest,
    GiftCardReloadRequest,
} from '../../domain/models';

@Injectable({
    providedIn: 'root',
})
export class GiftCardService {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = `${environment.apiUrl}/giftcards`;

    getGiftCardById(id: string): Observable<GiftCard> {
        return this.http.get<GiftCard>(`${this.baseUrl}/${id}`);
    }

    getGiftCardByNumber(cardNumber: string): Observable<GiftCard> {
        return this.http.get<GiftCard>(`${this.baseUrl}/number/${cardNumber}`);
    }

    createGiftCard(card: Partial<GiftCard>): Observable<GiftCard> {
        return this.http.post<GiftCard>(this.baseUrl, card);
    }

    updateGiftCard(id: string, card: Partial<GiftCard>): Observable<void> {
        return this.http.put<void>(`${this.baseUrl}/${id}`, card);
    }

    redeemGiftCard(id: string, request: GiftCardRedeemRequest): Observable<GiftCard> {
        return this.http.post<GiftCard>(`${this.baseUrl}/${id}/redeem`, request);
    }

    reloadGiftCard(id: string, request: GiftCardReloadRequest): Observable<GiftCard> {
        return this.http.post<GiftCard>(`${this.baseUrl}/${id}/reload`, request);
    }

    deleteGiftCard(id: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}
