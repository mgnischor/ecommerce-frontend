export enum ProductCategory {
    Electronics = 0,
    Clothing = 1,
    Books = 2,
    Home = 3,
    Sports = 4,
    Beauty = 5,
    Toys = 6,
    Food = 7,
    Other = 8,
}

export enum ProductStatus {
    Draft = 0,
    Active = 1,
    Inactive = 2,
    Discontinued = 3,
}

export enum OrderStatus {
    Pending = 0,
    Processing = 1,
    Shipped = 2,
    Delivered = 3,
    Cancelled = 4,
    Returned = 5,
}

export enum PaymentMethod {
    CreditCard = 0,
    DebitCard = 1,
    PayPal = 2,
    BankTransfer = 3,
    Cash = 4,
}

export enum ShipmentStatus {
    Pending = 0,
    InTransit = 1,
    Delivered = 2,
    Cancelled = 3,
    Returned = 4,
}

export enum ShippingMethod {
    Standard = 0,
    Express = 1,
    Overnight = 2,
    International = 3,
}

export enum RefundStatus {
    Pending = 0,
    Approved = 1,
    Rejected = 2,
    Processed = 3,
    Cancelled = 4,
}

export enum NotificationType {
    OrderPlaced = 0,
    OrderShipped = 1,
    OrderDelivered = 2,
    OrderCancelled = 3,
    PaymentReceived = 4,
    RefundProcessed = 5,
    InventoryLow = 6,
    Other = 7,
}

export enum InventoryTransactionType {
    Purchase = 0,
    Sale = 1,
    Adjustment = 2,
    Return = 3,
    Transfer = 4,
}

export enum PromotionType {
    Percentage = 0,
    FixedAmount = 1,
    BuyOneGetOne = 2,
    FreeShipping = 3,
}

export enum VendorStatus {
    Active = 0,
    Inactive = 1,
    Suspended = 2,
}

export enum UserAccessLevel {
    Guest = 0,
    Customer = 1,
    Vendor = 2,
    Admin = 3,
    SuperAdmin = 4,
}
