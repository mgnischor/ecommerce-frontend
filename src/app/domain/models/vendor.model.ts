import { VendorStatus } from './enums';

export interface Vendor {
    id: string;
    userId: string;
    businessName: string;
    storeName: string;
    email: string;
    phoneNumber: string;
    description?: string;
    logoUrl?: string;
    bannerUrl?: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    taxId?: string;
    registrationNumber?: string;
    commissionRate: number;
    rating: number;
    totalRatings: number;
    totalSales: number;
    totalOrders: number;
    status: VendorStatus;
    bankAccountNumber?: string;
    bankName?: string;
    bankRoutingNumber?: string;
    payPalEmail?: string;
    isVerified: boolean;
    verifiedAt?: string;
    isFeatured: boolean;
    isDeleted: boolean;
    createdBy?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface PaginatedVendors {
    items: Vendor[];
    totalCount: number;
    pageNumber: number;
    pageSize: number;
    totalPages: number;
}
