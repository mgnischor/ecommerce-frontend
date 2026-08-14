import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RewardsService } from '../../../../infrastructure/services';
import { LoyaltyReward, RewardValueResponse } from '../../../../domain/models';

@Component({
    selector: 'app-admin-rewards',
    imports: [FormsModule],
    templateUrl: './rewards.html',
    styleUrl: './rewards.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminRewards {
    private readonly rewardsService = inject(RewardsService);

    customerId = signal('');
    reward = signal<LoyaltyReward | null>(null);
    value = signal<RewardValueResponse | null>(null);
    isLoading = signal(false);
    error = signal<string | null>(null);
    successMessage = signal<string | null>(null);

    showEarnModal = signal(false);
    earnForm = signal({ amountSpent: 0 });

    showRedeemModal = signal(false);
    redeemForm = signal({ rewardCost: 0 });

    search() {
        const customerId = this.customerId();
        if (!customerId) return;

        this.isLoading.set(true);
        this.error.set(null);
        this.reward.set(null);
        this.value.set(null);

        this.rewardsService.getRewardByCustomerId(customerId).subscribe({
            next: (reward) => {
                this.reward.set(reward);
                this.loadValue(reward.id);
                this.isLoading.set(false);
            },
            error: () => {
                this.reward.set(null);
                this.isLoading.set(false);
                this.error.set('Recompensa não encontrada para este cliente');
            },
        });
    }

    loadValue(id: string) {
        this.rewardsService.getRewardValue(id).subscribe({
            next: (value) => this.value.set(value),
            error: () => {},
        });
    }

    openEarnModal() {
        this.earnForm.set({ amountSpent: 0 });
        this.showEarnModal.set(true);
    }

    closeEarnModal() {
        this.showEarnModal.set(false);
    }

    earnPoints() {
        const reward = this.reward();
        if (!reward) return;

        this.rewardsService
            .earnPoints(reward.id, { amountSpent: this.earnForm().amountSpent })
            .subscribe({
                next: (updated) => {
                    this.successMessage.set('Pontos creditados com sucesso');
                    this.closeEarnModal();
                    this.reward.set(updated);
                    this.loadValue(updated.id);
                    setTimeout(() => this.successMessage.set(null), 3000);
                },
                error: () => this.error.set('Erro ao creditar pontos'),
            });
    }

    openRedeemModal() {
        this.redeemForm.set({ rewardCost: 0 });
        this.showRedeemModal.set(true);
    }

    closeRedeemModal() {
        this.showRedeemModal.set(false);
    }

    redeemPoints() {
        const reward = this.reward();
        if (!reward) return;

        this.rewardsService
            .redeemPoints(reward.id, { rewardCost: this.redeemForm().rewardCost })
            .subscribe({
                next: (updated) => {
                    this.successMessage.set('Pontos resgatados com sucesso');
                    this.closeRedeemModal();
                    this.reward.set(updated);
                    this.loadValue(updated.id);
                    setTimeout(() => this.successMessage.set(null), 3000);
                },
                error: () => this.error.set('Erro ao resgatar pontos'),
            });
    }

    updateFormField(form: 'earn' | 'redeem', field: string, value: unknown) {
        if (form === 'earn') this.earnForm.update((d) => ({ ...d, [field]: value }));
        else this.redeemForm.update((d) => ({ ...d, [field]: value }));
    }

    formatDate(date: string | undefined): string {
        if (!date) return '—';
        return new Date(date).toLocaleDateString('pt-BR');
    }
}
