import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BackupFile, RestoreBackupRequest } from '../../domain/models';

@Injectable({
    providedIn: 'root',
})
export class BackupService {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = `${environment.apiUrl}/backups`;

    getBackups(): Observable<BackupFile[]> {
        return this.http.get<BackupFile[]>(this.baseUrl);
    }

    createBackup(): Observable<BackupFile> {
        return this.http.post<BackupFile>(this.baseUrl, {});
    }

    restoreBackup(request: RestoreBackupRequest): Observable<void> {
        return this.http.post<void>(`${this.baseUrl}/restore`, request);
    }

    deleteBackup(fileName: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${encodeURIComponent(fileName)}`);
    }
}
