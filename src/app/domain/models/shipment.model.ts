import { ShipmentStatus, ShippingMethod } from './enums';

export interface Shipment {
    id: string;
    orderId: string;
    trackingNumber: string;
    carrier: string;
    shippingMethod: ShippingMethod;
    status: ShipmentStatus;
    shippedDate?: string;
    estimatedDeliveryDate?: string;
    actualDeliveryDate?: string;
    shippingAddress?: {
        street: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
    };
    createdAt?: string;
    updatedAt?: string;
}

export interface PaginatedShipments {
    items: Shipment[];
    totalCount: number;
    pageNumber: number;
    pageSize: number;
    totalPages: number;
}
