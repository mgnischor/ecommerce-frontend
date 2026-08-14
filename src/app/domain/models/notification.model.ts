import { NotificationType } from './enums';

export interface Notification {
    id: string;
    userId: string;
    type: NotificationType;
    title: string;
    message: string;
    actionUrl?: string;
    icon?: string;
    relatedEntityId?: string;
    relatedEntityType?: string;
    isRead: boolean;
    readAt?: string;
    sendEmail?: boolean;
    emailSent?: boolean;
    emailSentAt?: string;
    sendPush?: boolean;
    pushSent?: boolean;
    pushSentAt?: string;
    priority: number;
    expiresAt?: string;
    metadata?: Record<string, string>;
    createdBy?: string;
    createdAt?: string;
}

export interface CreateNotificationRequest {
    userId: string;
    type: NotificationType;
    title: string;
    message: string;
    relatedEntityId?: string;
    relatedEntityType?: string;
    actionUrl?: string;
}

export interface UnreadCountResponse {
    count: number;
}
