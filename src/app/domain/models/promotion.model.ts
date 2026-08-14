import { PromotionType } from './enums';

export interface Promotion {
    id: string;
    name: string;
    description: string;
    type: PromotionType;
    code?: string;
    discountPercentage?: number;
    discountAmount?: number;
    minimumOrderAmount?: number;
    maximumDiscountAmount?: number;
    startDate: string;
    endDate: string;
    maxUsageCount?: number;
    usageCount: number;
    maxUsagePerUser?: number;
    eligibleProductIds?: string[];
    eligibleCategoryIds?: string[];
    eligibleUserIds?: string[];
    priority: number;
    isCombinable: boolean;
    isActive: boolean;
    isFeatured: boolean;
    bannerUrl?: string;
    termsAndConditions?: string;
    isDeleted: boolean;
    createdBy?: string;
    createdAt?: string;
    updatedAt?: string;
}
