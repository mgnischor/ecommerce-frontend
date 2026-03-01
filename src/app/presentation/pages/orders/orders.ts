import { Component, ChangeDetectionStrategy, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OrderService, AuthService } from '../../../infrastructure/services';
import { Order, OrderStatus } from '../../../domain/models';

/**
 * Orders page component.
 * Displays the user's order history and order details.
 */
@Component({
    selector: 'app-orders',
    imports: [CommonModule, RouterLink],
    templateUrl: './orders.html',
    styleUrl: './orders.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Orders implements OnInit {
    private orderService = inject(OrderService);
    private authService = inject(AuthService);

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
            this.error.set('Faça login para ver seus pedidos');
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
        if (!confirm('Tem certeza que deseja cancelar este pedido?')) return;

        this.orderService.cancelOrder(orderId).subscribe({
            next: (updated) => {
                this.orders.update((orders) => orders.map((o) => (o.id === orderId ? updated : o)));
                this.selectedOrder.set(updated);
            },
            error: () => {
                this.error.set('Erro ao cancelar pedido');
            },
        });
    }

    getStatusLabel(status: OrderStatus): string {
        const labels: Record<number, string> = {
            [OrderStatus.Pending]: 'Pendente',
            [OrderStatus.Processing]: 'Processando',
            [OrderStatus.Shipped]: 'Enviado',
            [OrderStatus.Delivered]: 'Entregue',
            [OrderStatus.Cancelled]: 'Cancelado',
            [OrderStatus.Returned]: 'Devolvido',
        };
        return labels[status] ?? 'Desconhecido';
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
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(price);
    }

    formatDate(date: string | undefined): string {
        if (!date) return '—';
        return new Date(date).toLocaleDateString('pt-BR');
    }
}
