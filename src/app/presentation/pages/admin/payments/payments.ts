import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaymentService } from '../../../../infrastructure/services';
import { Payment, PaymentMethod, PaymentStatus } from '../../../../domain/models';

@Component({
    selector: 'app-admin-payments',
    imports: [CommonModule, FormsModule],
    templateUrl: './payments.html',
    styleUrl: './payments.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminPayments {
    private readonly paymentService = inject(PaymentService);

    orderId = signal('');
    payments = signal<Payment[]>([]);
    isLoading = signal(false);
    error = signal<string | null>(null);
    successMessage = signal<string | null>(null);

    showProcessModal = signal(false);
    processForm = signal({
        orderId: '',
        paymentMethod: PaymentMethod.CreditCard,
    });

    searchByOrder() {
        const id = this.orderId();
        if (!id) return;

        this.isLoading.set(true);
        this.error.set(null);
        this.paymentService.getPaymentByOrderId(id).subscribe({
            next: (payment) => {
                this.payments.set([payment]);
                this.isLoading.set(false);
            },
            error: () => {
                this.payments.set([]);
                this.isLoading.set(false);
                this.error.set('Nenhum pagamento encontrado para este pedido');
            },
        });
    }

    openProcessModal() {
        this.processForm.set({
            orderId: this.orderId() || '',
            paymentMethod: PaymentMethod.CreditCard,
        });
        this.showProcessModal.set(true);
    }

    closeProcessModal() {
        this.showProcessModal.set(false);
    }

    processPayment() {
        const data = this.processForm();
        if (!data.orderId) return;

        this.paymentService
            .processPayment({
                orderId: data.orderId,
                paymentMethod: data.paymentMethod,
            })
            .subscribe({
                next: (payment) => {
                    this.successMessage.set('Pagamento processado com sucesso');
                    this.closeProcessModal();
                    this.payments.set([payment]);
                    setTimeout(() => this.successMessage.set(null), 3000);
                },
                error: () => this.error.set('Erro ao processar pagamento'),
            });
    }

    refundPayment(paymentId: string) {
        if (!confirm('Deseja reembolsar o valor total deste pagamento?')) return;

        this.paymentService.refundPayment(paymentId, {}).subscribe({
            next: (payment) => {
                this.successMessage.set('Reembolso realizado com sucesso');
                this.payments.set([payment]);
                setTimeout(() => this.successMessage.set(null), 3000);
            },
            error: () => this.error.set('Erro ao reembolsar pagamento'),
        });
    }

    updateFormField(field: string, value: unknown) {
        this.processForm.update((data) => ({ ...data, [field]: value }));
    }

    getStatusLabel(status: PaymentStatus): string {
        const labels: Record<number, string> = {
            [PaymentStatus.Pending]: 'Pendente',
            [PaymentStatus.Processing]: 'Processando',
            [PaymentStatus.Completed]: 'Concluído',
            [PaymentStatus.Failed]: 'Falhou',
            [PaymentStatus.Cancelled]: 'Cancelado',
            [PaymentStatus.Refunded]: 'Reembolsado',
            [PaymentStatus.PartiallyRefunded]: 'Parcialmente Reembolsado',
            [PaymentStatus.OnHold]: 'Em Espera',
        };
        return labels[status] ?? 'Desconhecido';
    }

    getStatusClass(status: PaymentStatus): string {
        const classes: Record<number, string> = {
            [PaymentStatus.Pending]: 'status-pending',
            [PaymentStatus.Processing]: 'status-processed',
            [PaymentStatus.Completed]: 'status-active',
            [PaymentStatus.Failed]: 'status-failed',
            [PaymentStatus.Cancelled]: 'status-cancelled',
            [PaymentStatus.Refunded]: 'status-returned',
            [PaymentStatus.PartiallyRefunded]: 'status-returned',
            [PaymentStatus.OnHold]: 'status-pending',
        };
        return classes[status] ?? '';
    }

    getMethodLabel(method: PaymentMethod): string {
        const labels: Record<number, string> = {
            [PaymentMethod.NotSpecified]: 'Não especificado',
            [PaymentMethod.CreditCard]: 'Cartão de Crédito',
            [PaymentMethod.DebitCard]: 'Cartão de Débito',
            [PaymentMethod.PayPal]: 'PayPal',
            [PaymentMethod.BankTransfer]: 'Transferência',
            [PaymentMethod.CashOnDelivery]: 'Dinheiro na Entrega',
            [PaymentMethod.Pix]: 'Pix',
            [PaymentMethod.Boleto]: 'Boleto',
            [PaymentMethod.Cryptocurrency]: 'Criptomoeda',
            [PaymentMethod.StoreCredit]: 'Crédito na Loja',
        };
        return labels[method] ?? 'Desconhecido';
    }

    formatCurrency(value: number): string {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    }

    formatDate(date: string | undefined): string {
        if (!date) return '—';
        return new Date(date).toLocaleString('pt-BR');
    }
}
