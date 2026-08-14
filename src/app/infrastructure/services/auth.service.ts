import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginRequest, LoginResponse, UserAccessLevel } from '../../domain/models';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = `${environment.apiUrl}/login`;
    private readonly tokenKey = 'auth_token';

    isAuthenticated = signal(false);
    currentUser = signal<{ email: string; userId: string; accessLevel: UserAccessLevel } | null>(
        null,
    );

    constructor() {
        this.checkAuthStatus();
    }

    login(credentials: LoginRequest): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(this.baseUrl, credentials).pipe(
            tap((response) => {
                this.setToken(response.token);
                this.isAuthenticated.set(true);
                this.currentUser.set({
                    email: response.email,
                    userId: response.userId,
                    accessLevel: this.mapAccessLevel(response.accessLevel),
                });
            }),
        );
    }

    logout(): void {
        this.removeToken();
        this.isAuthenticated.set(false);
        this.currentUser.set(null);
    }

    getToken(): string | null {
        if (globalThis.window !== undefined) {
            return localStorage.getItem(this.tokenKey);
        }
        return null;
    }

    hasRole(...roles: UserAccessLevel[]): boolean {
        const user = this.currentUser();
        if (!user) return false;
        return roles.includes(user.accessLevel);
    }

    private mapAccessLevel(value: string): UserAccessLevel {
        switch (value?.toLowerCase()) {
            case 'guest':
                return UserAccessLevel.Guest;
            case 'customer':
                return UserAccessLevel.Customer;
            case 'company':
                return UserAccessLevel.Company;
            case 'admin':
                return UserAccessLevel.Admin;
            case 'manager':
                return UserAccessLevel.Manager;
            case 'developer':
                return UserAccessLevel.Developer;
            default:
                return UserAccessLevel.Guest;
        }
    }

    private setToken(token: string): void {
        if (globalThis.window !== undefined) {
            localStorage.setItem(this.tokenKey, token);
        }
    }

    private removeToken(): void {
        if (globalThis.window !== undefined) {
            localStorage.removeItem(this.tokenKey);
        }
    }

    private checkAuthStatus(): void {
        const token = this.getToken();
        this.isAuthenticated.set(!!token);
    }
}
