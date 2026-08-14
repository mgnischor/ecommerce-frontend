import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
    LoyaltyReward,
    EarnPointsRequest,
    RedeemPointsRequest,
    RewardValueResponse,
} from '../../domain/models';

@Injectable({
    providedIn: 'root',
})
export class RewardsService {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = `${environment.apiUrl}/rewards`;

    getRewardById(id: string): Observable<LoyaltyReward> {
        return this.http.get<LoyaltyReward>(`${this.baseUrl}/${id}`);
    }

    getRewardByCustomerId(customerId: string): Observable<LoyaltyReward> {
        return this.http.get<LoyaltyReward>(`${this.baseUrl}/customer/${customerId}`);
    }

    createReward(reward: Partial<LoyaltyReward>): Observable<LoyaltyReward> {
        return this.http.post<LoyaltyReward>(this.baseUrl, reward);
    }

    updateReward(id: string, reward: Partial<LoyaltyReward>): Observable<void> {
        return this.http.put<void>(`${this.baseUrl}/${id}`, reward);
    }

    earnPoints(id: string, request: EarnPointsRequest): Observable<LoyaltyReward> {
        return this.http.post<LoyaltyReward>(`${this.baseUrl}/${id}/earn`, request);
    }

    redeemPoints(id: string, request: RedeemPointsRequest): Observable<LoyaltyReward> {
        return this.http.post<LoyaltyReward>(`${this.baseUrl}/${id}/redeem`, request);
    }

    getRewardValue(id: string): Observable<RewardValueResponse> {
        return this.http.get<RewardValueResponse>(`${this.baseUrl}/${id}/value`);
    }

    deleteReward(id: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}
