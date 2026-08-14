export interface Diagnostics {
    application: string;
    runtime: string;
    uptime: number;
    database: {
        connected: boolean;
        provider: string;
    };
    serverTimeUtc: string;
}
