import { ProductCategory, ProductStatus } from './enums';

export interface Product {
    id: string;
    name: string;
    description?: string;
    sku: string;
    category: ProductCategory;
    status: ProductStatus;
    price: number;
    cost?: number;
    weight?: number;
    dimensions?: string;
    imageUrl?: string;
    isFeatured: boolean;
    isOnSale: boolean;
    salePrice?: number;
    stockQuantity: number;
    createdBy?: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface ProductAttribute {
    id: string;
    code: string;
    name: string;
    description?: string;
    isVariantAttribute: boolean;
    values?: string[];
}

export interface ProductVariant {
    id: string;
    productId: string;
    sku: string;
    name?: string;
    price: number;
    stockQuantity: number;
    attributes?: Record<string, string>;
    imageUrl?: string;
    isActive: boolean;
}

export interface PaginatedProducts {
    items: Product[];
    totalCount: number;
    pageNumber: number;
    pageSize: number;
    totalPages: number;
}
