import { RefundStatus } from './enums';

export interface Refund {
    id: string;
    refundNumber: string;
    orderId: string;
    customerId: string;
    paymentId?: string;
    status: RefundStatus;
    refundAmount: number;
    reason: string;
    customerNotes?: string;
    adminNotes?: string;
    orderItemIds?: string[];
    requiresReturn: boolean;
    returnTrackingNumber?: string;
    returnedAt?: string;
    approvedAt?: string;
    approvedBy?: string;
    processedAt?: string;
    completedAt?: string;
    rejectionReason?: string;
    transactionId?: string;
    restockingFee?: number;
    isDeleted: boolean;
    createdBy?: string;
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
    refundAmount: number;
    reason: string;
    paymentId?: string;
    requiresReturn?: boolean;
    customerNotes?: string;
    orderItemIds?: string[];
}

export interface RejectRefundRequest {
    reason: string;
}
