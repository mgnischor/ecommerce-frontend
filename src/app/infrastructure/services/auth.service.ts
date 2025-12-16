import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginRequest, LoginResponse } from '../../domain/models';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = `${environment.apiUrl}/login`;
    private readonly tokenKey = 'auth_token';

    isAuthenticated = signal(false);
    currentUser = signal<{ email: string; userId: string } | null>(null);

    constructor() {
        this.checkAuthStatus();
    }

    login(credentials: LoginRequest): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(this.baseUrl, credentials).pipe(
            tap((response) => {
                this.setToken(response.token);
                this.isAuthenticated.set(true);
                if (response.email && response.userId) {
                    this.currentUser.set({
                        email: response.email,
                        userId: response.userId,
                    });
                }
            })
        );
    }

    logout(): void {
        this.removeToken();
        this.isAuthenticated.set(false);
        this.currentUser.set(null);
    }

    getToken(): string | null {
        if (typeof window !== 'undefined') {
            return localStorage.getItem(this.tokenKey);
        }
        return null;
    }

    private setToken(token: string): void {
        if (typeof window !== 'undefined') {
            localStorage.setItem(this.tokenKey, token);
        }
    }

    private removeToken(): void {
        if (typeof window !== 'undefined') {
            localStorage.removeItem(this.tokenKey);
        }
    }

    private checkAuthStatus(): void {
        const token = this.getToken();
        this.isAuthenticated.set(!!token);
    }
}
