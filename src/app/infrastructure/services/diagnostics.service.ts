import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Diagnostics } from '../../domain/models';

@Injectable({
    providedIn: 'root',
})
export class DiagnosticsService {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = `${environment.apiUrl}/diagnostics`;

    getDiagnostics(): Observable<Diagnostics> {
        return this.http.get<Diagnostics>(this.baseUrl);
    }
}
