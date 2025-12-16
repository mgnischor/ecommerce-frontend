import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User, PaginatedUsers } from '../../domain/models';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = `${environment.apiUrl}/users`;

    getUsers(pageNumber = 1, pageSize = 10): Observable<PaginatedUsers> {
        const params = new HttpParams().set('pageNumber', pageNumber.toString()).set('pageSize', pageSize.toString());

        return this.http.get<PaginatedUsers>(this.baseUrl, { params });
    }

    getUserById(id: string): Observable<User> {
        return this.http.get<User>(`${this.baseUrl}/${id}`);
    }

    createUser(user: Partial<User>): Observable<User> {
        return this.http.post<User>(this.baseUrl, user);
    }

    updateUser(id: string, user: Partial<User>): Observable<void> {
        return this.http.put<void>(`${this.baseUrl}/${id}`, user);
    }

    deleteUser(id: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}
