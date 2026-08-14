export interface LoyaltyReward {
    id: string;
    customerId: string;
    pointBalance: number;
    totalPointsEarned: number;
    totalPointsRedeemed: number;
    lastEarnedAt?: string;
    tier: string;
    isDeleted: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export interface EarnPointsRequest {
    amountSpent: number;
    reviewCount?: number;
    averageRating?: number;
}

export interface RedeemPointsRequest {
    rewardCost: number;
}

export interface RewardValueResponse {
    pointBalance: number;
    tier: string;
    value: number;
}
