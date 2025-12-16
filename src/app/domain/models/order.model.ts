import { OrderStatus, PaymentMethod } from './enums';

export interface Order {
    id: string;
    orderNumber?: string;
    customerId: string;
    status: OrderStatus;
    paymentMethod: PaymentMethod;
    subtotal: number;
    tax: number;
    shippingCost: number;
    total: number;
    shippingAddress?: Address;
    billingAddress?: Address;
    items?: OrderItem[];
    createdAt?: string;
    updatedAt?: string;
}

export interface OrderItem {
    id: string;
    orderId: string;
    productId: string;
    productVariantId?: string;
    productName: string;
    sku: string;
    quantity: number;
    unitPrice: number;
    total: number;
}

export interface Address {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
}

export interface CreateOrderRequest {
    customerId: string;
    paymentMethod: PaymentMethod;
    items: CreateOrderItem[];
    shippingAddress: Address;
    billingAddress?: Address;
}

export interface CreateOrderItem {
    productId: string;
    productVariantId?: string;
    quantity: number;
}

export interface UpdateOrderStatusRequest {
    status: OrderStatus;
}
