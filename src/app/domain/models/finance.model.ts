export interface FinancialTransaction {
    id: string;
    transactionNumber: string;
    transactionType: string;
    amount: number;
    currency: string;
    transactionDate: string;
    description: string;
    orderId?: string;
    paymentId?: string;
    inventoryTransactionId?: string;
    journalEntryId?: string;
    productId?: string;
    counterparty?: string;
    referenceNumber?: string;
    isReconciled: boolean;
    reconciledAt?: string;
    paymentMethod?: string;
    paymentProvider?: string;
    status: string;
    notes?: string;
    taxAmount: number;
    feeAmount: number;
    netAmount: number;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
}

export interface CashFlowReport {
    startDate: string;
    endDate: string;
    totalInflows: number;
    totalOutflows: number;
    netCashFlow: number;
    customerPayments: number;
    salesRevenue: number;
    supplierPayments: number;
    purchaseExpenses: number;
    refunds: number;
    operatingExpenses: number;
    paymentFees: number;
    shippingCosts: number;
    taxes: number;
}

export interface AccountsReceivable {
    totalReceivable: number;
    current_0_30: number;
    aging_31_60: number;
    aging_61_90: number;
    aging_Over90: number;
    count: number;
}

export interface AccountsPayable {
    totalPayable: number;
    current_0_30: number;
    aging_31_60: number;
    aging_61_90: number;
    aging_Over90: number;
    count: number;
}

export interface FinancialDashboard {
    cashFlow: CashFlowReport;
    accountsReceivable: AccountsReceivable;
    accountsPayable: AccountsPayable;
    unreconciledTransactions: number;
    totalTransactions: number;
    lastReconciliationDate?: string;
}

export interface ReconcileTransactionRequest {
    notes?: string;
}
