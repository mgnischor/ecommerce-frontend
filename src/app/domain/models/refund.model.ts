import { RefundStatus } from './enums';

export interface Refund {
    id: string;
    orderId: string;
    customerId: string;
    amount: number;
    reason: string;
    status: RefundStatus;
    rejectionReason?: string;
    processedDate?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface PaginatedRefunds {
    items: Refund[];
    totalCount: number;
    pageNumber: number;
    pageSize: number;
    totalPages: number;
}

export interface CreateRefundRequest {
    orderId: string;
    customerId: string;
    amount: number;
    reason: string;
}

export interface RejectRefundRequest {
    rejectionReason: string;
}
