import {
    Component,
    ChangeDetectionStrategy,
    inject,
    signal,
    OnInit,
    computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RefundService } from '../../../../infrastructure/services';
import { Refund, RefundStatus } from '../../../../domain/models';

@Component({
    selector: 'app-admin-refunds',
    imports: [CommonModule, FormsModule],
    templateUrl: './refunds.html',
    styleUrl: './refunds.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminRefunds implements OnInit {
    private refundService = inject(RefundService);

    refunds = signal<Refund[]>([]);
    isLoading = signal(false);
    error = signal<string | null>(null);
    successMessage = signal<string | null>(null);
    currentPage = signal(1);
    pageSize = signal(10);
    totalCount = signal(0);
    totalPages = computed(() => Math.ceil(this.totalCount() / this.pageSize()));

    showRejectModal = signal(false);
    selectedRefundId = signal<string | null>(null);
    rejectionReason = signal('');

    ngOnInit() {
        this.loadRefunds();
    }

    loadRefunds() {
        this.isLoading.set(true);
        this.error.set(null);

        this.refundService.getRefunds(this.currentPage(), this.pageSize()).subscribe({
            next: (data) => {
                this.refunds.set(data.items);
                this.totalCount.set(data.totalCount);
                this.isLoading.set(false);
            },
            error: () => {
                this.error.set('Erro ao carregar reembolsos');
                this.isLoading.set(false);
            },
        });
    }

    approveRefund(id: string) {
        this.refundService.approveRefund(id).subscribe({
            next: () => {
                this.successMessage.set('Reembolso aprovado com sucesso');
                this.loadRefunds();
                setTimeout(() => this.successMessage.set(null), 3000);
            },
            error: () => this.error.set('Erro ao aprovar reembolso'),
        });
    }

    openRejectModal(id: string) {
        this.selectedRefundId.set(id);
        this.rejectionReason.set('');
        this.showRejectModal.set(true);
    }

    closeRejectModal() {
        this.showRejectModal.set(false);
        this.selectedRefundId.set(null);
    }

    confirmReject() {
        const id = this.selectedRefundId();
        if (!id || !this.rejectionReason()) return;

        this.refundService.rejectRefund(id, { rejectionReason: this.rejectionReason() }).subscribe({
            next: () => {
                this.successMessage.set('Reembolso rejeitado');
                this.closeRejectModal();
                this.loadRefunds();
                setTimeout(() => this.successMessage.set(null), 3000);
            },
            error: () => this.error.set('Erro ao rejeitar reembolso'),
        });
    }

    onPageChange(page: number) {
        this.currentPage.set(page);
        this.loadRefunds();
    }

    getStatusLabel(status: RefundStatus): string {
        const labels: Record<number, string> = {
            [RefundStatus.Pending]: 'Pendente',
            [RefundStatus.Approved]: 'Aprovado',
            [RefundStatus.Rejected]: 'Rejeitado',
            [RefundStatus.Processed]: 'Processado',
            [RefundStatus.Cancelled]: 'Cancelado',
        };
        return labels[status] ?? 'Desconhecido';
    }

    getStatusClass(status: RefundStatus): string {
        const classes: Record<number, string> = {
            [RefundStatus.Pending]: 'status-pending',
            [RefundStatus.Approved]: 'status-approved',
            [RefundStatus.Rejected]: 'status-rejected',
            [RefundStatus.Processed]: 'status-processed',
            [RefundStatus.Cancelled]: 'status-cancelled',
        };
        return classes[status] ?? '';
    }

    formatCurrency(value: number): string {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    }

    formatDate(date: string | undefined): string {
        if (!date) return '—';
        return new Date(date).toLocaleDateString('pt-BR');
    }
}
