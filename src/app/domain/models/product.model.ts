import { ProductCategory, ProductStatus } from './enums';

export interface Product {
    id: string;
    name: string;
    description: string;
    sku: string;
    brand: string;
    category: ProductCategory;
    status: ProductStatus;
    price: number;
    discountPrice?: number;
    weight: number;
    stockQuantity: number;
    minStockLevel: number;
    maxOrderQuantity: number;
    isActive: boolean;
    isDeleted: boolean;
    isFeatured: boolean;
    isOnSale: boolean;
    imageUrl: string;
    images?: string[];
    tags?: string[];
    createdBy?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface ProductAttribute {
    id: string;
    code: string;
    name: string;
    description?: string;
    dataType: string;
    possibleValues?: string[];
    defaultValue?: string;
    isRequired: boolean;
    isVariantAttribute: boolean;
    isFilterable: boolean;
    isSearchable: boolean;
    isVisibleOnProductPage: boolean;
    displayOrder: number;
    unit?: string;
    validationPattern?: string;
}

export interface ProductVariant {
    id: string;
    productId: string;
    name: string;
    sku: string;
    barcode?: string;
    price: number;
    discountPrice?: number;
    stockQuantity: number;
    weight?: number;
    imageUrl?: string;
    images?: string[];
    attributes?: Record<string, string>;
    isDefault: boolean;
    isAvailable: boolean;
    displayOrder: number;
    isDeleted: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export interface PaginatedProducts {
    items: Product[];
    totalCount: number;
    pageNumber: number;
    pageSize: number;
    totalPages: number;
}
