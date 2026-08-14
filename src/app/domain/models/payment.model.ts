import { PaymentMethod, PaymentStatus } from './enums';

export interface Payment {
    paymentId: string;
    orderId: string;
    transactionId: string;
    status: PaymentStatus;
    amount: number;
    currency: string;
    paymentMethod: PaymentMethod;
    errorMessage?: string;
    providerResponse: string;
    processedAt: string;
    createdAt: string;
}

export interface ProcessPaymentRequest {
    orderId: string;
    paymentMethod: PaymentMethod;
    currency?: string;
}

export interface RefundPaymentRequest {
    amount?: number;
}
