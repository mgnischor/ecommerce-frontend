import { Component, ChangeDetectionStrategy, inject, signal, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShipmentService } from '../../../../infrastructure/services';
import { Shipment, ShipmentStatus } from '../../../../domain/models';

@Component({
    selector: 'app-admin-shipments',
    imports: [CommonModule, FormsModule],
    templateUrl: './shipments.html',
    styleUrl: './shipments.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminShipments implements OnInit {
    private shipmentService = inject(ShipmentService);

    shipments = signal<Shipment[]>([]);
    isLoading = signal(false);
    error = signal<string | null>(null);
    currentPage = signal(1);
    pageSize = signal(10);
    totalCount = signal(0);
    totalPages = computed(() => Math.ceil(this.totalCount() / this.pageSize()));
    searchTracking = signal('');

    ngOnInit() {
        this.loadShipments();
    }

    loadShipments() {
        this.isLoading.set(true);
        this.error.set(null);

        this.shipmentService.getShipments(this.currentPage(), this.pageSize()).subscribe({
            next: (data) => {
                this.shipments.set(data.items);
                this.totalCount.set(data.totalCount);
                this.isLoading.set(false);
            },
            error: () => {
                this.error.set('Erro ao carregar envios');
                this.isLoading.set(false);
            },
        });
    }

    searchByTracking() {
        const tracking = this.searchTracking();
        if (!tracking) {
            this.loadShipments();
            return;
        }

        this.isLoading.set(true);
        this.shipmentService.getShipmentByTrackingNumber(tracking).subscribe({
            next: (shipment) => {
                this.shipments.set([shipment]);
                this.totalCount.set(1);
                this.isLoading.set(false);
            },
            error: () => {
                this.shipments.set([]);
                this.isLoading.set(false);
            },
        });
    }

    onPageChange(page: number) {
        this.currentPage.set(page);
        this.loadShipments();
    }

    getStatusLabel(status: ShipmentStatus): string {
        const labels: Record<number, string> = {
            [ShipmentStatus.Pending]: 'Pendente',
            [ShipmentStatus.InTransit]: 'Em Trânsito',
            [ShipmentStatus.Delivered]: 'Entregue',
            [ShipmentStatus.Cancelled]: 'Cancelado',
            [ShipmentStatus.Returned]: 'Devolvido',
        };
        return labels[status] ?? 'Desconhecido';
    }

    getStatusClass(status: ShipmentStatus): string {
        const classes: Record<number, string> = {
            [ShipmentStatus.Pending]: 'status-pending',
            [ShipmentStatus.InTransit]: 'status-transit',
            [ShipmentStatus.Delivered]: 'status-delivered',
            [ShipmentStatus.Cancelled]: 'status-cancelled',
            [ShipmentStatus.Returned]: 'status-returned',
        };
        return classes[status] ?? '';
    }

    formatDate(date: string | undefined): string {
        if (!date) return '—';
        return new Date(date).toLocaleDateString('pt-BR');
    }
}
