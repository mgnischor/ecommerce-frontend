import { InventoryTransactionType } from './enums';

export interface InventoryTransaction {
    id: string;
    productId: string;
    productVariantId?: string;
    transactionType: InventoryTransactionType;
    quantity: number;
    fromLocation?: string;
    toLocation?: string;
    referenceNumber?: string;
    notes?: string;
    createdAt?: string;
    createdBy?: string;
}

export interface RecordInventoryTransactionRequest {
    productId: string;
    productVariantId?: string;
    transactionType: InventoryTransactionType;
    quantity: number;
    fromLocation?: string;
    toLocation: string;
    referenceNumber?: string;
    notes?: string;
}
