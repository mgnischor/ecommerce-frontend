import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GiftCardService } from '../../../../infrastructure/services';
import { GiftCard } from '../../../../domain/models';

@Component({
    selector: 'app-admin-gift-cards',
    imports: [FormsModule],
    templateUrl: './gift-cards.html',
    styleUrl: './gift-cards.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminGiftCards {
    private readonly giftCardService = inject(GiftCardService);

    searchNumber = signal('');
    cards = signal<GiftCard[]>([]);
    isLoading = signal(false);
    error = signal<string | null>(null);
    successMessage = signal<string | null>(null);

    showCreateModal = signal(false);
    createForm = signal({ cardNumber: '', balance: 100 });

    showRedeemModal = signal(false);
    redeemForm = signal({ id: '', redeemAmount: 0 });

    showReloadModal = signal(false);
    reloadForm = signal({ id: '', newBalance: 0 });

    search() {
        const number = this.searchNumber();
        if (!number) return;

        this.isLoading.set(true);
        this.error.set(null);
        this.giftCardService.getGiftCardByNumber(number).subscribe({
            next: (card) => {
                this.cards.set([card]);
                this.isLoading.set(false);
            },
            error: () => {
                this.cards.set([]);
                this.isLoading.set(false);
                this.error.set('Cartão não encontrado');
            },
        });
    }

    openCreateModal() {
        this.createForm.set({ cardNumber: '', balance: 100 });
        this.showCreateModal.set(true);
    }

    closeCreateModal() {
        this.showCreateModal.set(false);
    }

    createCard() {
        this.giftCardService.createGiftCard(this.createForm()).subscribe({
            next: (card) => {
                this.successMessage.set('Cartão criado com sucesso');
                this.closeCreateModal();
                this.cards.set([card]);
                setTimeout(() => this.successMessage.set(null), 3000);
            },
            error: () => this.error.set('Erro ao criar cartão'),
        });
    }

    openRedeemModal(card: GiftCard) {
        this.redeemForm.set({ id: card.id, redeemAmount: 0 });
        this.showRedeemModal.set(true);
    }

    closeRedeemModal() {
        this.showRedeemModal.set(false);
    }

    redeem() {
        const data = this.redeemForm();
        this.giftCardService.redeemGiftCard(data.id, { redeemAmount: data.redeemAmount }).subscribe({
            next: (card) => {
                this.successMessage.set('Resgate realizado com sucesso');
                this.closeRedeemModal();
                this.cards.set([card]);
                setTimeout(() => this.successMessage.set(null), 3000);
            },
            error: () => this.error.set('Erro ao resgatar cartão'),
        });
    }

    openReloadModal(card: GiftCard) {
        this.reloadForm.set({ id: card.id, newBalance: card.balance });
        this.showReloadModal.set(true);
    }

    closeReloadModal() {
        this.showReloadModal.set(false);
    }

    reload() {
        const data = this.reloadForm();
        this.giftCardService.reloadGiftCard(data.id, { newBalance: data.newBalance }).subscribe({
            next: (card) => {
                this.successMessage.set('Saldo atualizado com sucesso');
                this.closeReloadModal();
                this.cards.set([card]);
                setTimeout(() => this.successMessage.set(null), 3000);
            },
            error: () => this.error.set('Erro ao recarregar cartão'),
        });
    }

    deleteCard(id: string) {
        if (!confirm('Tem certeza que deseja excluir este cartão?')) return;

        this.giftCardService.deleteGiftCard(id).subscribe({
            next: () => {
                this.successMessage.set('Cartão excluído com sucesso');
                this.cards.set([]);
                setTimeout(() => this.successMessage.set(null), 3000);
            },
            error: () => this.error.set('Erro ao excluir cartão'),
        });
    }

    updateFormField(form: 'create' | 'redeem' | 'reload', field: string, value: unknown) {
        if (form === 'create') this.createForm.update((d) => ({ ...d, [field]: value }));
        else if (form === 'redeem') this.redeemForm.update((d) => ({ ...d, [field]: value }));
        else this.reloadForm.update((d) => ({ ...d, [field]: value }));
    }

    formatCurrency(value: number): string {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    }

    formatDate(date: string | undefined): string {
        if (!date) return '—';
        return new Date(date).toLocaleDateString('pt-BR');
    }
}
