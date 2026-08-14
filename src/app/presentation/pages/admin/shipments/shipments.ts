import {
    Component,
    ChangeDetectionStrategy,
    inject,
    signal,
    OnInit,
    computed,
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { ShipmentService } from '../../../../infrastructure/services';
import { Shipment, ShipmentStatus } from '../../../../domain/models';

@Component({
    selector: 'app-admin-shipments',
    imports: [FormsModule],
    templateUrl: './shipments.html',
    styleUrl: './shipments.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminShipments implements OnInit {
    private readonly shipmentService = inject(ShipmentService);

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
            [ShipmentStatus.Preparing]: 'Preparando',
            [ShipmentStatus.ReadyForPickup]: 'Pronto p/ Retirada',
            [ShipmentStatus.PickedUp]: 'Coletado',
            [ShipmentStatus.InTransit]: 'Em Trânsito',
            [ShipmentStatus.OutForDelivery]: 'Saiu p/ Entrega',
            [ShipmentStatus.Delivered]: 'Entregue',
            [ShipmentStatus.FailedDelivery]: 'Falha na Entrega',
            [ShipmentStatus.Returning]: 'Devolvendo',
            [ShipmentStatus.Returned]: 'Devolvido',
            [ShipmentStatus.Cancelled]: 'Cancelado',
        };
        return labels[status] ?? 'Desconhecido';
    }

    getStatusClass(status: ShipmentStatus): string {
        const classes: Record<number, string> = {
            [ShipmentStatus.Preparing]: 'status-pending',
            [ShipmentStatus.ReadyForPickup]: 'status-pending',
            [ShipmentStatus.PickedUp]: 'status-transit',
            [ShipmentStatus.InTransit]: 'status-transit',
            [ShipmentStatus.OutForDelivery]: 'status-transit',
            [ShipmentStatus.Delivered]: 'status-delivered',
            [ShipmentStatus.FailedDelivery]: 'status-failed',
            [ShipmentStatus.Returning]: 'status-returned',
            [ShipmentStatus.Returned]: 'status-returned',
            [ShipmentStatus.Cancelled]: 'status-cancelled',
        };
        return classes[status] ?? '';
    }

    formatDate(date: string | undefined): string {
        if (!date) return '—';
        return new Date(date).toLocaleDateString('pt-BR');
    }
}
