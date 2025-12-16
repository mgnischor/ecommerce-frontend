import { PromotionType } from './enums';

export interface Promotion {
    id: string;
    code: string;
    name: string;
    description?: string;
    type: PromotionType;
    discountValue: number;
    minimumPurchase?: number;
    maximumDiscount?: number;
    startDate: string;
    endDate: string;
    isActive: boolean;
    isFeatured: boolean;
    usageLimit?: number;
    usageCount: number;
    applicableProducts?: string[];
    createdAt?: string;
    updatedAt?: string;
}
