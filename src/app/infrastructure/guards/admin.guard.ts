import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { UserAccessLevel } from '../../domain/models';
import { AuthService, UserService } from '../services';

export const adminGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const userService = inject(UserService);
    const router = inject(Router);

    if (!authService.isAuthenticated()) {
        return router.createUrlTree(['/login']);
    }

    const user = authService.currentUser();
    if (!user?.userId) {
        return router.createUrlTree(['/login']);
    }

    return userService.getUserById(user.userId).pipe(
        map((u) => {
            const hasAdminAccess = u.accessLevel >= UserAccessLevel.Admin;
            return hasAdminAccess ? true : router.createUrlTree(['/']);
        }),
        catchError(() => of(router.createUrlTree(['/'])))
    );
};
