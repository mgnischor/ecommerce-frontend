import { Component, ChangeDetectionStrategy, inject, signal, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { PromotionService } from '../../../../infrastructure/services';
import { Promotion, PromotionType } from '../../../../domain/models';

@Component({
    selector: 'app-admin-promotions',
    imports: [FormsModule],
    templateUrl: './promotions.html',
    styleUrl: './promotions.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminPromotions implements OnInit {
    private readonly promotionService = inject(PromotionService);

    promotions = signal<Promotion[]>([]);
    isLoading = signal(false);
    error = signal<string | null>(null);
    successMessage = signal<string | null>(null);
    searchCode = signal('');
    showFeaturedOnly = signal(false);

    showFormModal = signal(false);
    editingPromotion = signal<Promotion | null>(null);
    formData = signal<Partial<Promotion>>({
        code: '',
        name: '',
        description: '',
        type: PromotionType.Percentage,
        discountValue: 0,
        minimumPurchase: undefined,
        maximumDiscount: undefined,
        startDate: '',
        endDate: '',
        isActive: true,
        isFeatured: false,
        usageLimit: undefined,
    });

    ngOnInit() {
        this.loadPromotions();
    }

    loadPromotions() {
        this.isLoading.set(true);
        this.error.set(null);

        const source = this.showFeaturedOnly()
            ? this.promotionService.getFeaturedPromotions()
            : this.promotionService.getAllPromotions();

        source.subscribe({
            next: (data) => {
                this.promotions.set(data);
                this.isLoading.set(false);
            },
            error: () => {
                this.error.set('Erro ao carregar promoções');
                this.isLoading.set(false);
            },
        });
    }

    searchByCode() {
        const code = this.searchCode();
        if (!code) {
            this.loadPromotions();
            return;
        }

        this.isLoading.set(true);
        this.promotionService.getPromotionByCode(code).subscribe({
            next: (promotion) => {
                this.promotions.set([promotion]);
                this.isLoading.set(false);
            },
            error: () => {
                this.promotions.set([]);
                this.isLoading.set(false);
            },
        });
    }

    toggleFeatured() {
        this.showFeaturedOnly.update((v) => !v);
        this.loadPromotions();
    }

    openCreateModal() {
        this.editingPromotion.set(null);
        this.formData.set({
            code: '',
            name: '',
            description: '',
            type: PromotionType.Percentage,
            discountValue: 0,
            startDate: '',
            endDate: '',
            isActive: true,
            isFeatured: false,
        });
        this.showFormModal.set(true);
    }

    openEditModal(promotion: Promotion) {
        this.editingPromotion.set(promotion);
        this.formData.set({ ...promotion });
        this.showFormModal.set(true);
    }

    closeFormModal() {
        this.showFormModal.set(false);
        this.editingPromotion.set(null);
    }

    savePromotion() {
        const editing = this.editingPromotion();
        const data = this.formData();

        if (editing) {
            this.promotionService.updatePromotion(editing.id, data).subscribe({
                next: () => {
                    this.successMessage.set('Promoção atualizada com sucesso');
                    this.closeFormModal();
                    this.loadPromotions();
                    setTimeout(() => this.successMessage.set(null), 3000);
                },
                error: () => this.error.set('Erro ao atualizar promoção'),
            });
        } else {
            this.promotionService.createPromotion(data).subscribe({
                next: () => {
                    this.successMessage.set('Promoção criada com sucesso');
                    this.closeFormModal();
                    this.loadPromotions();
                    setTimeout(() => this.successMessage.set(null), 3000);
                },
                error: () => this.error.set('Erro ao criar promoção'),
            });
        }
    }

    deletePromotion(id: string) {
        if (!confirm('Tem certeza que deseja excluir esta promoção?')) return;

        this.promotionService.deletePromotion(id).subscribe({
            next: () => {
                this.successMessage.set('Promoção excluída com sucesso');
                this.loadPromotions();
                setTimeout(() => this.successMessage.set(null), 3000);
            },
            error: () => this.error.set('Erro ao excluir promoção'),
        });
    }

    updateFormField(field: string, value: unknown) {
        this.formData.update((data) => ({ ...data, [field]: value }));
    }

    getTypeLabel(type: PromotionType): string {
        const labels: Record<number, string> = {
            [PromotionType.Percentage]: 'Percentual',
            [PromotionType.FixedAmount]: 'Valor Fixo',
            [PromotionType.BuyOneGetOne]: 'Compre 1, Leve 2',
            [PromotionType.FreeShipping]: 'Frete Grátis',
        };
        return labels[type] ?? 'Desconhecido';
    }

    formatDate(date: string | undefined): string {
        if (!date) return '—';
        return new Date(date).toLocaleDateString('pt-BR');
    }

    formatCurrency(value: number | undefined): string {
        if (value == null) return '—';
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    }
}
