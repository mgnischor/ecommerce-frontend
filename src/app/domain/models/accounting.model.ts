export interface AccountingEntry {
    id: string;
    accountId: string;
    accountCode: string;
    accountName: string;
    entryType: string;
    amount: number;
    description?: string;
    costCenter?: string;
}

export interface JournalEntry {
    id: string;
    entryNumber: string;
    entryDate: string;
    documentType: string;
    documentNumber: string;
    history: string;
    totalAmount: number;
    isPosted: boolean;
    postedAt?: string;
    productId?: string;
    inventoryTransactionId?: string;
    orderId?: string;
    createdBy: string;
    createdAt: string;
    entries: AccountingEntry[];
}

export interface ChartOfAccounts {
    id: string;
    accountCode: string;
    accountName: string;
    accountType: string;
    parentAccountId?: string;
    isAnalytic: boolean;
    isActive: boolean;
    balance: number;
    description?: string;
    createdAt: string;
    updatedAt: string;
}
