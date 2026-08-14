export interface BackupFile {
    fileName: string;
    sizeBytes: number;
    createdAtUtc: string;
}

export interface RestoreBackupRequest {
    fileName: string;
}
