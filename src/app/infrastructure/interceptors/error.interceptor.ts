import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    const router = inject(Router);
    const authService = inject(AuthService);

    return next(req).pipe(
        catchError((error) => {
            if (error.status === 401) {
                // Token inválido ou expirado
                authService.logout();
                router.navigate(['/login']);
            }

            // Retornar o erro para ser tratado pelos componentes
            return throwError(() => error);
        })
    );
};
