export interface Customer {
    id: string;
    userId: string;
    totalSpending: number;
    totalOrders: number;
    lastOrderDate?: string;
    lastLoginAt?: string;
    historicalAverageOrderDays?: number;
    isActive: boolean;
    isDeleted: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export interface CustomerSegment {
    segment: string;
    lifetimeValue: number;
    orderFrequency: number;
    averageOrderValue: number;
}
