export interface GiftCard {
    id: string;
    cardNumber: string;
    balance: number;
    isActive: boolean;
    isRevoked: boolean;
    allowsReload: boolean;
    issuedAt: string;
    expiresAt?: string;
    isDeleted: boolean;
    createdBy?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface GiftCardRedeemRequest {
    redeemAmount: number;
}

export interface GiftCardReloadRequest {
    newBalance: number;
}
