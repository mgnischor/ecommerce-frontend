export interface Invoice {
    id: string;
    invoiceNumber: string;
    orderId: string;
    customerId: string;
    subtotal: number;
    taxAmount: number;
    shippingCost: number;
    total: number;
    paidAmount: number;
    dueDate: string;
    issuedAt: string;
    isPaid: boolean;
    isDeleted: boolean;
    createdBy?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface InvoicePaymentRequest {
    paidAmount: number;
}

export interface CreditNoteRequest {
    amount: number;
}
