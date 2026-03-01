export interface ShippingZone {
    id: string;
    name: string;
    description?: string;
    countries: string[];
    states: string[];
    postalCodes: string[];
    baseRate: number;
    ratePerKg?: number;
    ratePerItem?: number;
    freeShippingThreshold?: number;
    minimumOrderAmount?: number;
    maximumOrderAmount?: number;
    estimatedDeliveryDaysMin: number;
    estimatedDeliveryDaysMax: number;
    availableShippingMethods: string[];
    taxRate?: number;
    priority: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}
