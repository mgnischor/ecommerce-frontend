import { OrderStatus, PaymentMethod, ShippingMethod } from './enums';

export interface Order {
    id: string;
    orderNumber: string;
    customerId: string;
    createdBy: string;
    updatedBy?: string;
    status: OrderStatus;
    subTotal: number;
    taxAmount: number;
    shippingCost: number;
    discountAmount: number;
    totalAmount: number;
    paymentMethod: PaymentMethod;
    shippingMethod: ShippingMethod;
    shippingAddressId?: string;
    billingAddressId?: string;
    couponCode?: string;
    customerNotes?: string;
    adminNotes?: string;
    trackingNumber?: string;
    expectedDeliveryDate?: string;
    deliveredAt?: string;
    cancelledAt?: string;
    cancellationReason?: string;
    isDeleted: boolean;
    items?: OrderItem[];
    createdAt?: string;
    updatedAt?: string;
}

export interface OrderItem {
    id: string;
    orderId: string;
    productId: string;
    productName: string;
    productSku: string;
    quantity: number;
    unitPrice: number;
    discountAmount: number;
    taxAmount: number;
    totalPrice: number;
    productImageUrl?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface CreateOrderRequest {
    customerId: string;
    orderNumber: string;
    shippingCost: number;
    taxAmount: number;
    discountAmount: number;
    items: CreateOrderItem[];
}

export interface CreateOrderItem {
    productId: string;
    productName: string;
    productSku: string;
    quantity: number;
    unitPrice: number;
    discountAmount: number;
    taxAmount: number;
}
