import { Component, ChangeDetectionStrategy, inject, signal, OnInit } from '@angular/core';

import { RouterLink } from '@angular/router';
import { OrderService, AuthService } from '../../../infrastructure/services';
import { TranslateService, TranslatePipe } from '../../../infrastructure/i18n';
import { Order, OrderStatus } from '../../../domain/models';

/**
 * Orders page component.
 * Displays the user's order history and order details.
 */
@Component({
    selector: 'app-orders',
    imports: [RouterLink, TranslatePipe],
    templateUrl: './orders.html',
    styleUrl: './orders.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Orders implements OnInit {
    private readonly orderService = inject(OrderService);
    private readonly authService = inject(AuthService);
    private readonly t = inject(TranslateService);

    orders = signal<Order[]>([]);
    selectedOrder = signal<Order | null>(null);
    isLoading = signal(false);
    error = signal<string | null>(null);

    ngOnInit() {
        this.loadOrders();
    }

    loadOrders() {
        const user = this.authService.currentUser();
        if (!user) {
            this.error.set(this.t.get('orders.loginRequired'));
            return;
        }

        this.isLoading.set(true);
        this.error.set(null);

        // Note: The API doesn't have a user-specific orders endpoint,
        // we load orders and display them
        this.orderService.getOrderById(user.userId).subscribe({
            next: (order) => {
                this.orders.set([order]);
                this.isLoading.set(false);
            },
            error: () => {
                this.orders.set([]);
                this.isLoading.set(false);
            },
        });
    }

    viewOrder(order: Order) {
        this.selectedOrder.set(order);
    }

    closeDetail() {
        this.selectedOrder.set(null);
    }

    cancelOrder(orderId: string) {
        if (!confirm(this.t.get('orders.confirmCancel'))) return;

        this.orderService.cancelOrder(orderId).subscribe({
            next: (updated) => {
                this.orders.update((orders) => orders.map((o) => (o.id === orderId ? updated : o)));
                this.selectedOrder.set(updated);
            },
            error: () => {
                this.error.set(this.t.get('orders.cancelError'));
            },
        });
    }

    getStatusLabel(status: OrderStatus): string {
        const labels: Record<number, string> = {
            [OrderStatus.Pending]: this.t.get('orders.statusPending'),
            [OrderStatus.Processing]: this.t.get('orders.statusProcessing'),
            [OrderStatus.Shipped]: this.t.get('orders.statusShipped'),
            [OrderStatus.Delivered]: this.t.get('orders.statusDelivered'),
            [OrderStatus.Cancelled]: this.t.get('orders.statusCancelled'),
            [OrderStatus.Returned]: this.t.get('orders.statusReturned'),
        };
        return labels[status] ?? this.t.get('orders.statusUnknown');
    }

    getStatusClass(status: OrderStatus): string {
        const classes: Record<number, string> = {
            [OrderStatus.Pending]: 'status-pending',
            [OrderStatus.Processing]: 'status-processing',
            [OrderStatus.Shipped]: 'status-shipped',
            [OrderStatus.Delivered]: 'status-delivered',
            [OrderStatus.Cancelled]: 'status-cancelled',
            [OrderStatus.Returned]: 'status-returned',
        };
        return classes[status] ?? '';
    }

    formatPrice(price: number): string {
        return this.t.formatPrice(price);
    }

    formatDate(date: string | undefined): string {
        return this.t.formatDate(date);
    }
}
