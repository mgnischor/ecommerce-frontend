import { ShipmentStatus } from './enums';

export interface Shipment {
    id: string;
    orderId: string;
    shippingAddressId: string;
    trackingNumber: string;
    carrier: string;
    serviceType: string;
    status: ShipmentStatus;
    shippingCost: number;
    weight: number;
    length?: number;
    width?: number;
    height?: number;
    expectedDeliveryDate?: string;
    deliveredAt?: string;
    shippedAt?: string;
    trackingUrl?: string;
    notes?: string;
    isInsured: boolean;
    insuranceAmount?: number;
    requiresSignature: boolean;
    receivedBy?: string;
    isDeleted: boolean;
    createdBy?: string;
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
