export interface Store {
    id: string;
    storeCode: string;
    name: string;
    description?: string;
    email: string;
    phoneNumber: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    latitude?: number;
    longitude?: number;
    managerId?: string;
    openingHours?: string;
    timezone: string;
    currency: string;
    logoUrl?: string;
    imageUrl?: string;
    isDefault: boolean;
    supportsPickup: boolean;
    supportsDelivery: boolean;
    isActive: boolean;
    displayOrder: number;
    createdAt: string;
    updatedAt: string;
}
