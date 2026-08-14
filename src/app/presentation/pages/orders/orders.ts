import { Component, ChangeDetectionStrategy, inject, signal, OnInit } from '@angular/core';

import { RouterLink } from '@angular/router';
import { OrderService, AuthService } from '../../../infrastructure/services';
import { TranslateService, TranslatePipe } from '../../../infrastructure/i18n';
import { Order, OrderStatus } from '../../../domain/models';

/**
 * Orders page component.
 * Displays the user's order history and order details.
 *
 * Note: the backend exposes order creation and retrieval by id only
 * (no list endpoint), so this page loads the most recently created order.
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

        const lastOrderId =
            globalThis.window !== undefined ? localStorage.getItem('last_order_id') : null;

        if (!lastOrderId) {
            this.isLoading.set(false);
            return;
        }

        this.isLoading.set(true);
        this.error.set(null);

        this.orderService.getOrderById(lastOrderId).subscribe({
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
            [OrderStatus.Confirmed]: this.t.get('orders.statusConfirmed'),
            [OrderStatus.Processing]: this.t.get('orders.statusProcessing'),
            [OrderStatus.Shipped]: this.t.get('orders.statusShipped'),
            [OrderStatus.Delivered]: this.t.get('orders.statusDelivered'),
            [OrderStatus.Cancelled]: this.t.get('orders.statusCancelled'),
            [OrderStatus.Refunded]: this.t.get('orders.statusRefunded'),
            [OrderStatus.OnHold]: this.t.get('orders.statusOnHold'),
            [OrderStatus.PaymentFailed]: this.t.get('orders.statusPaymentFailed'),
            [OrderStatus.Completed]: this.t.get('orders.statusCompleted'),
            [OrderStatus.Returned]: this.t.get('orders.statusReturned'),
        };
        return labels[status] ?? this.t.get('orders.statusUnknown');
    }

    getStatusClass(status: OrderStatus): string {
        const classes: Record<number, string> = {
            [OrderStatus.Pending]: 'status-pending',
            [OrderStatus.Confirmed]: 'status-processing',
            [OrderStatus.Processing]: 'status-processing',
            [OrderStatus.Shipped]: 'status-shipped',
            [OrderStatus.Delivered]: 'status-delivered',
            [OrderStatus.Cancelled]: 'status-cancelled',
            [OrderStatus.Refunded]: 'status-refunded',
            [OrderStatus.OnHold]: 'status-hold',
            [OrderStatus.PaymentFailed]: 'status-failed',
            [OrderStatus.Completed]: 'status-delivered',
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
