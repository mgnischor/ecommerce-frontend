import { UserAccessLevel } from './enums';

export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    accessLevel: UserAccessLevel;
    isActive: boolean;
    createdBy?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface PaginatedUsers {
    items: User[];
    totalCount: number;
    pageNumber: number;
    pageSize: number;
    totalPages: number;
}
