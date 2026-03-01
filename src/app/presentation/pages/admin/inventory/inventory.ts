import { Component, ChangeDetectionStrategy, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventoryService } from '../../../../infrastructure/services';
import { InventoryTransaction, InventoryTransactionType } from '../../../../domain/models';

@Component({
    selector: 'app-admin-inventory',
    imports: [CommonModule, FormsModule],
    templateUrl: './inventory.html',
    styleUrl: './inventory.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminInventory implements OnInit {
    private inventoryService = inject(InventoryService);

    transactions = signal<InventoryTransaction[]>([]);
    isLoading = signal(false);
    error = signal<string | null>(null);
    successMessage = signal<string | null>(null);

    filterMode = signal<'product' | 'period'>('period');
    productId = signal('');
    startDate = signal(this.getDefaultStartDate());
    endDate = signal(this.getDefaultEndDate());

    showCreateModal = signal(false);
    formData = signal({
        productId: '',
        productVariantId: '',
        transactionType: InventoryTransactionType.Purchase,
        quantity: 1,
        fromLocation: '',
        toLocation: '',
        referenceNumber: '',
        notes: '',
    });

    ngOnInit() {
        this.loadByPeriod();
    }

    private getDefaultStartDate(): string {
        const d = new Date();
        d.setMonth(d.getMonth() - 1);
        return d.toISOString().split('T')[0];
    }

    private getDefaultEndDate(): string {
        return new Date().toISOString().split('T')[0];
    }

    loadByPeriod() {
        this.isLoading.set(true);
        this.error.set(null);
        this.filterMode.set('period');

        this.inventoryService.getTransactionsByPeriod(this.startDate(), this.endDate()).subscribe({
            next: (data) => {
                this.transactions.set(data);
                this.isLoading.set(false);
            },
            error: () => {
                this.error.set('Erro ao carregar transações de inventário');
                this.isLoading.set(false);
            },
        });
    }

    loadByProduct() {
        const id = this.productId();
        if (!id) return;

        this.isLoading.set(true);
        this.error.set(null);
        this.filterMode.set('product');

        this.inventoryService.getTransactionsByProductId(id).subscribe({
            next: (data) => {
                this.transactions.set(data);
                this.isLoading.set(false);
            },
            error: () => {
                this.error.set('Erro ao carregar transações do produto');
                this.isLoading.set(false);
            },
        });
    }

    openCreateModal() {
        this.formData.set({
            productId: '',
            productVariantId: '',
            transactionType: InventoryTransactionType.Purchase,
            quantity: 1,
            fromLocation: '',
            toLocation: '',
            referenceNumber: '',
            notes: '',
        });
        this.showCreateModal.set(true);
    }

    closeCreateModal() {
        this.showCreateModal.set(false);
    }

    createTransaction() {
        const data = this.formData();
        this.inventoryService
            .createTransaction({
                productId: data.productId,
                productVariantId: data.productVariantId || undefined,
                transactionType: data.transactionType,
                quantity: data.quantity,
                fromLocation: data.fromLocation || undefined,
                toLocation: data.toLocation,
                referenceNumber: data.referenceNumber || undefined,
                notes: data.notes || undefined,
            })
            .subscribe({
                next: () => {
                    this.successMessage.set('Transação registrada com sucesso');
                    this.closeCreateModal();
                    this.loadByPeriod();
                    setTimeout(() => this.successMessage.set(null), 3000);
                },
                error: () => this.error.set('Erro ao registrar transação'),
            });
    }

    updateFormField(field: string, value: unknown) {
        this.formData.update((data) => ({ ...data, [field]: value }));
    }

    getTypeLabel(type: InventoryTransactionType): string {
        const labels: Record<number, string> = {
            [InventoryTransactionType.Purchase]: 'Compra',
            [InventoryTransactionType.Sale]: 'Venda',
            [InventoryTransactionType.Adjustment]: 'Ajuste',
            [InventoryTransactionType.Return]: 'Devolução',
            [InventoryTransactionType.Transfer]: 'Transferência',
        };
        return labels[type] ?? 'Desconhecido';
    }

    getTypeClass(type: InventoryTransactionType): string {
        const classes: Record<number, string> = {
            [InventoryTransactionType.Purchase]: 'status-active',
            [InventoryTransactionType.Sale]: 'status-processed',
            [InventoryTransactionType.Adjustment]: 'status-pending',
            [InventoryTransactionType.Return]: 'status-returned',
            [InventoryTransactionType.Transfer]: 'status-transit',
        };
        return classes[type] ?? '';
    }

    formatDate(date: string | undefined): string {
        if (!date) return '—';
        return new Date(date).toLocaleDateString('pt-BR');
    }
}
