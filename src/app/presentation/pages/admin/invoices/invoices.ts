import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InvoiceService } from '../../../../infrastructure/services';
import { Invoice } from '../../../../domain/models';

@Component({
    selector: 'app-admin-invoices',
    imports: [CommonModule, FormsModule],
    templateUrl: './invoices.html',
    styleUrl: './invoices.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminInvoices {
    private readonly invoiceService = inject(InvoiceService);

    searchNumber = signal('');
    invoices = signal<Invoice[]>([]);
    isLoading = signal(false);
    error = signal<string | null>(null);
    successMessage = signal<string | null>(null);

    showPayModal = signal(false);
    payForm = signal({ id: '', paidAmount: 0 });

    showCreditNoteModal = signal(false);
    creditNoteForm = signal({ id: '', amount: 0 });

    search() {
        const number = this.searchNumber();
        if (!number) return;

        this.isLoading.set(true);
        this.error.set(null);
        this.invoiceService.getInvoiceByNumber(number).subscribe({
            next: (invoice) => {
                this.invoices.set([invoice]);
                this.isLoading.set(false);
            },
            error: () => {
                this.invoices.set([]);
                this.isLoading.set(false);
                this.error.set('Nota fiscal não encontrada');
            },
        });
    }

    openPayModal(invoice: Invoice) {
        this.payForm.set({ id: invoice.id, paidAmount: invoice.total - invoice.paidAmount });
        this.showPayModal.set(true);
    }

    closePayModal() {
        this.showPayModal.set(false);
    }

    payInvoice() {
        const data = this.payForm();
        this.invoiceService.payInvoice(data.id, { paidAmount: data.paidAmount }).subscribe({
            next: (invoice) => {
                this.successMessage.set('Pagamento registrado com sucesso');
                this.closePayModal();
                this.invoices.set([invoice]);
                setTimeout(() => this.successMessage.set(null), 3000);
            },
            error: () => this.error.set('Erro ao registrar pagamento'),
        });
    }

    openCreditNoteModal(invoice: Invoice) {
        this.creditNoteForm.set({ id: invoice.id, amount: 0 });
        this.showCreditNoteModal.set(true);
    }

    closeCreditNoteModal() {
        this.showCreditNoteModal.set(false);
    }

    issueCreditNote() {
        const data = this.creditNoteForm();
        this.invoiceService.issueCreditNote(data.id, { amount: data.amount }).subscribe({
            next: (invoice) => {
                this.successMessage.set('Nota de crédito emitida com sucesso');
                this.closeCreditNoteModal();
                this.invoices.set([invoice]);
                setTimeout(() => this.successMessage.set(null), 3000);
            },
            error: () => this.error.set('Erro ao emitir nota de crédito'),
        });
    }

    updateFormField(form: 'pay' | 'credit', field: string, value: unknown) {
        if (form === 'pay') this.payForm.update((d) => ({ ...d, [field]: value }));
        else this.creditNoteForm.update((d) => ({ ...d, [field]: value }));
    }

    formatCurrency(value: number): string {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    }

    formatDate(date: string | undefined): string {
        if (!date) return '—';
        return new Date(date).toLocaleDateString('pt-BR');
    }
}
