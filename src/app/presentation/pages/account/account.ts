import { Component, ChangeDetectionStrategy, inject, signal, OnInit } from '@angular/core';

import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, UserService, NotificationService } from '../../../infrastructure/services';
import { TranslateService, TranslatePipe } from '../../../infrastructure/i18n';
import { User, Notification } from '../../../domain/models';

/**
 * User account page component.
 * Displays and manages user account information and settings.
 */
@Component({
    selector: 'app-account',
    imports: [ReactiveFormsModule, TranslatePipe],
    templateUrl: './account.html',
    styleUrl: './account.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Account implements OnInit {
    private readonly authService = inject(AuthService);
    private readonly userService = inject(UserService);
    private readonly notificationService = inject(NotificationService);
    private readonly router = inject(Router);
    private readonly t = inject(TranslateService);

    user = signal<User | null>(null);
    notifications = signal<Notification[]>([]);
    isLoading = signal(true);
    isSaving = signal(false);
    error = signal<string | null>(null);
    successMessage = signal<string | null>(null);
    activeTab = signal<'profile' | 'notifications'>('profile');

    profileForm = new FormGroup({
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        email: new FormControl({ value: '', disabled: true }),
        phoneNumber: new FormControl(''),
    });

    ngOnInit() {
        this.loadUserData();
    }

    loadUserData() {
        const currentUser = this.authService.currentUser();
        if (!currentUser) {
            this.router.navigate(['/login']);
            return;
        }

        this.isLoading.set(true);
        this.userService.getUserById(currentUser.userId).subscribe({
            next: (user) => {
                this.user.set(user);
                this.profileForm.patchValue({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phoneNumber: user.phoneNumber || '',
                });
                this.loadNotifications(currentUser.userId);
                this.isLoading.set(false);
            },
            error: () => {
                this.error.set(this.t.get('account.errorLoadingUser'));
                this.isLoading.set(false);
            },
        });
    }

    loadNotifications(userId: string) {
        this.notificationService.getUserNotifications(userId).subscribe({
            next: (notifications) => this.notifications.set(notifications),
            error: () => {},
        });
    }

    switchTab(tab: 'profile' | 'notifications') {
        this.activeTab.set(tab);
    }

    onSaveProfile() {
        if (this.profileForm.invalid) {
            this.profileForm.markAllAsTouched();
            return;
        }

        const currentUser = this.user();
        if (!currentUser) return;

        this.isSaving.set(true);
        this.successMessage.set(null);
        this.error.set(null);

        const { firstName, lastName, phoneNumber } = this.profileForm.value;

        this.userService
            .updateUser(currentUser.id, {
                firstName: firstName!,
                lastName: lastName!,
                phoneNumber: phoneNumber || undefined,
            })
            .subscribe({
                next: () => {
                    this.isSaving.set(false);
                    this.successMessage.set(this.t.get('account.profileUpdated'));
                    this.user.update((u) =>
                        u
                            ? {
                                  ...u,
                                  firstName: firstName!,
                                  lastName: lastName!,
                                  phoneNumber: phoneNumber || undefined,
                              }
                            : u,
                    );
                },
                error: () => {
                    this.isSaving.set(false);
                    this.error.set(this.t.get('account.errorUpdatingProfile'));
                },
            });
    }

    markNotificationAsRead(id: string) {
        this.notificationService.markAsRead(id).subscribe({
            next: () => {
                this.notifications.update((notifs) =>
                    notifs.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
                );
            },
        });
    }

    markAllAsRead() {
        const currentUser = this.authService.currentUser();
        if (!currentUser) return;

        this.notificationService.markAllAsRead(currentUser.userId).subscribe({
            next: () => {
                this.notifications.update((notifs) => notifs.map((n) => ({ ...n, isRead: true })));
            },
        });
    }

    deleteNotification(id: string) {
        this.notificationService.deleteNotification(id).subscribe({
            next: () => {
                this.notifications.update((notifs) => notifs.filter((n) => n.id !== id));
            },
        });
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }

    formatDate(date: string | undefined): string {
        return this.t.formatDate(date, {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    }
}
