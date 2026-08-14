export enum ProductCategory {
    General = 0,
    Electronics = 1,
    Clothing = 2,
    Books = 3,
    Home = 4,
    Sports = 5,
    Toys = 6,
    Food = 7,
    Beauty = 8,
    Automotive = 9,
    Garden = 10,
    Health = 11,
    Jewelry = 12,
    Music = 13,
    Office = 14,
    Pet = 15,
    Tools = 16,
    VideoGames = 17,
}

export enum ProductStatus {
    Draft = 0,
    Active = 1,
    Inactive = 2,
    OutOfStock = 3,
    Discontinued = 4,
}

export enum OrderStatus {
    Pending = 0,
    Confirmed = 1,
    Processing = 2,
    Shipped = 3,
    Delivered = 4,
    Cancelled = 5,
    Refunded = 6,
    OnHold = 7,
    PaymentFailed = 8,
    Completed = 9,
    Returned = 10,
}

export enum PaymentMethod {
    NotSpecified = 0,
    CreditCard = 1,
    DebitCard = 2,
    PayPal = 3,
    BankTransfer = 4,
    CashOnDelivery = 5,
    Pix = 6,
    Boleto = 7,
    Cryptocurrency = 8,
    StoreCredit = 9,
}

export enum PaymentStatus {
    Pending = 0,
    Processing = 1,
    Completed = 2,
    Failed = 3,
    Cancelled = 4,
    Refunded = 5,
    PartiallyRefunded = 6,
    OnHold = 7,
}

export enum ShipmentStatus {
    Preparing = 0,
    ReadyForPickup = 1,
    PickedUp = 2,
    InTransit = 3,
    OutForDelivery = 4,
    Delivered = 5,
    FailedDelivery = 6,
    Returning = 7,
    Returned = 8,
    Cancelled = 9,
}

export enum ShippingMethod {
    NotSpecified = 0,
    Standard = 1,
    Express = 2,
    NextDay = 3,
    SameDay = 4,
    StorePickup = 5,
    FreeShipping = 6,
    International = 7,
}

export enum RefundStatus {
    Requested = 0,
    UnderReview = 1,
    Approved = 2,
    Rejected = 3,
    Processing = 4,
    Completed = 5,
    Cancelled = 6,
}

export enum NotificationType {
    System = 0,
    Order = 1,
    Payment = 2,
    Shipment = 3,
    Product = 4,
    Promotion = 5,
    Account = 6,
    Review = 7,
}

export enum InventoryTransactionType {
    Purchase = 1,
    Sale = 2,
    SaleReturn = 3,
    PurchaseReturn = 4,
    Adjustment = 5,
    Transfer = 6,
    Loss = 7,
    Reservation = 8,
    ReservationRelease = 9,
    Fulfillment = 10,
}

export enum PromotionType {
    PercentageDiscount = 0,
    FixedAmountDiscount = 1,
    BuyXGetYFree = 2,
    FreeShipping = 3,
    Bundle = 4,
    FlashSale = 5,
    Clearance = 6,
}

export enum VendorStatus {
    Pending = 0,
    Active = 1,
    Suspended = 2,
    Inactive = 3,
    Rejected = 4,
}

export enum UserAccessLevel {
    Guest = 0,
    Customer = 1,
    Company = 2,
    Admin = 3,
    Manager = 4,
    Developer = 99,
}

export enum FinancialTransactionType {
    CustomerPayment = 1,
    SupplierPayment = 2,
    AccountsReceivable = 3,
    AccountsPayable = 4,
    CustomerRefund = 5,
    SaleRevenue = 6,
    PurchaseExpense = 7,
    OperatingExpense = 8,
    PaymentFee = 9,
    ShippingCost = 10,
    TaxTransaction = 11,
    SalesDiscount = 12,
    Adjustment = 13,
    BankTransfer = 14,
    CommissionPayment = 15,
}

export enum AccountType {
    Asset = 1,
    Liability = 2,
    Equity = 3,
    Revenue = 4,
    Expense = 5,
}

export enum EntryType {
    Debit = 1,
    Credit = 2,
}

export enum AddressType {
    Shipping = 0,
    Billing = 1,
    Both = 2,
    Home = 3,
    Work = 4,
    Other = 5,
}
