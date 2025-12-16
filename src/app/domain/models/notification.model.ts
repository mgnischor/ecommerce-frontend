import { NotificationType } from './enums';

export interface Notification {
    id: string;
    userId: string;
    type: NotificationType;
    title: string;
    message: string;
    isRead: boolean;
    createdAt: string;
    readAt?: string;
    relatedEntityId?: string;
}

export interface CreateNotificationRequest {
    userId: string;
    type: NotificationType;
    title: string;
    message: string;
    relatedEntityId?: string;
}

export interface UnreadCountResponse {
    count: number;
}
