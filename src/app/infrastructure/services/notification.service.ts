import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Notification, CreateNotificationRequest, UnreadCountResponse } from '../../domain/models';

@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = `${environment.apiUrl}/notifications`;

    getUserNotifications(userId: string, unreadOnly = false): Observable<Notification[]> {
        const params = new HttpParams().set('unreadOnly', unreadOnly.toString());
        return this.http.get<Notification[]>(`${this.baseUrl}/user/${userId}`, { params });
    }

    getNotificationById(id: string): Observable<Notification> {
        return this.http.get<Notification>(`${this.baseUrl}/${id}`);
    }

    createNotification(request: CreateNotificationRequest): Observable<Notification> {
        return this.http.post<Notification>(this.baseUrl, request);
    }

    markAsRead(id: string): Observable<void> {
        return this.http.patch<void>(`${this.baseUrl}/${id}/read`, {});
    }

    markAllAsRead(userId: string): Observable<void> {
        return this.http.patch<void>(`${this.baseUrl}/user/${userId}/read-all`, {});
    }

    getUnreadCount(userId: string): Observable<UnreadCountResponse> {
        return this.http.get<UnreadCountResponse>(`${this.baseUrl}/user/${userId}/unread-count`);
    }

    deleteNotification(id: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}
