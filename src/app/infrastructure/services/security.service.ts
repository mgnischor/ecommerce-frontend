import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SecurityAuditEvent, WafStats } from '../../domain/models';

@Injectable({
    providedIn: 'root',
})
export class SecurityService {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = `${environment.apiUrl}/security`;

    getAudit(count = 100): Observable<SecurityAuditEvent[]> {
        const params = new HttpParams().set('count', count.toString());
        return this.http.get<SecurityAuditEvent[]>(`${this.baseUrl}/audit`, { params });
    }

    getWafStats(): Observable<WafStats> {
        return this.http.get<WafStats>(`${this.baseUrl}/waf`);
    }
}
