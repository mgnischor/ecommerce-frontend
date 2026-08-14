import { InventoryTransactionType } from './enums';

export interface InventoryTransaction {
    id: string;
    transactionNumber: string;
    transactionDate: string;
    transactionType: InventoryTransactionType;
    productId: string;
    productSku: string;
    productName: string;
    fromLocation?: string;
    toLocation: string;
    quantity: number;
    unitCost: number;
    totalCost: number;
    journalEntryId?: string;
    orderId?: string;
    documentNumber?: string;
    notes?: string;
    createdBy: string;
    createdAt?: string;
}

export interface RecordInventoryTransactionRequest {
    transactionType: InventoryTransactionType;
    productId: string;
    productSku: string;
    productName: string;
    quantity: number;
    unitCost: number;
    fromLocation?: string;
    toLocation: string;
    orderId?: string;
    documentNumber?: string;
    notes?: string;
}

export interface InventoryPlan {
    id: string;
    productId: string;
    currentStock: number;
    reorderPoint: number;
    averageDailySales: number;
    leadTimeDays?: number;
    serviceLevelPercent?: number;
    receivedAt: string;
    costOfGoodsSold: number;
    averageInventoryValue: number;
    salesInLast90Days: number;
    isDeleted: boolean;
    createdAt?: string;
    updatedAt?: string;
}
