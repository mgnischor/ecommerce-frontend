import { VendorStatus } from './enums';

export interface Vendor {
    id: string;
    name: string;
    email: string;
    phoneNumber?: string;
    description?: string;
    logoUrl?: string;
    websiteUrl?: string;
    status: VendorStatus;
    isFeatured: boolean;
    rating?: number;
    totalSales?: number;
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
