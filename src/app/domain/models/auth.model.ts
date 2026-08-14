export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    expiresIn: number;
    tokenType: string;
    userId: string;
    email: string;
    accessLevel: string;
}
