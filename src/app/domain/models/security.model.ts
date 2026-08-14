export interface SecurityAuditEvent {
    id: string;
    timestampUtc: string;
    category: string;
    severity: string;
    message: string;
    ipAddress?: string;
    userAgent?: string;
    path?: string;
}

export interface WafStats {
    totalBlocked: number;
    rules: Record<string, number>;
}
