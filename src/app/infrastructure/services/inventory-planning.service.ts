import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { InventoryPlan } from '../../domain/models';

@Injectable({
    providedIn: 'root',
})
export class InventoryPlanningService {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = `${environment.apiUrl}/inventory-planning`;

    getInventoryPlanById(id: string): Observable<InventoryPlan> {
        return this.http.get<InventoryPlan>(`${this.baseUrl}/${id}`);
    }

    getInventoryPlanByProductId(productId: string): Observable<InventoryPlan> {
        return this.http.get<InventoryPlan>(`${this.baseUrl}/product/${productId}`);
    }

    createInventoryPlan(plan: Partial<InventoryPlan>): Observable<InventoryPlan> {
        return this.http.post<InventoryPlan>(this.baseUrl, plan);
    }

    updateInventoryPlan(id: string, plan: Partial<InventoryPlan>): Observable<void> {
        return this.http.put<void>(`${this.baseUrl}/${id}`, plan);
    }

    getInventoryPlanAnalysis(id: string): Observable<unknown> {
        return this.http.get<unknown>(`${this.baseUrl}/${id}/analysis`);
    }

    deleteInventoryPlan(id: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}
