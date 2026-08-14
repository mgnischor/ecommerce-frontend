import { UserAccessLevel } from './enums';

export interface User {
    id: string;
    username: string;
    email: string;
    accessLevel: UserAccessLevel;
    isActive: boolean;
    isBanned: boolean;
    isEmailVerified: boolean;
    address?: string;
    city?: string;
    country?: string;
    birthDate?: string;
    createdBy?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface CreateUserRequest {
    username: string;
    email: string;
    password: string;
    accessLevel: UserAccessLevel;
    isActive: boolean;
    address?: string;
    city?: string;
    country?: string;
}

export interface PaginatedUsers {
    items: User[];
    totalCount: number;
    pageNumber: number;
    pageSize: number;
    totalPages: number;
}
