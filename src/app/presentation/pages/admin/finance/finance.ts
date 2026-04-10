import { Component, ChangeDetectionStrategy, inject, signal, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { FinanceService } from '../../../../infrastructure/services';
import { FinancialDashboard, FinancialTransaction } from '../../../../domain/models';

@Component({
    selector: 'app-admin-finance',
    imports: [FormsModule],
    templateUrl: './finance.html',
    styleUrl: './finance.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminFinance implements OnInit {
    private readonly financeService = inject(FinanceService);

    dashboard = signal<FinancialDashboard | null>(null);
    transactions = signal<FinancialTransaction[]>([]);
    unreconciledTransactions = signal<FinancialTransaction[]>([]);
    isLoading = signal(false);
    error = signal<string | null>(null);
    successMessage = signal<string | null>(null);

    activeTab = signal<'dashboard' | 'transactions' | 'unreconciled'>('dashboard');

    startDate = signal(this.getDefaultStartDate());
    endDate = signal(this.getDefaultEndDate());

    ngOnInit() {
        this.loadDashboard();
    }

    private getDefaultStartDate(): string {
        const d = new Date();
        d.setMonth(d.getMonth() - 1);
        return d.toISOString().split('T')[0];
    }

    private getDefaultEndDate(): string {
        return new Date().toISOString().split('T')[0];
    }

    loadDashboard() {
        this.isLoading.set(true);
        this.error.set(null);

        this.financeService.getDashboard(this.startDate(), this.endDate()).subscribe({
            next: (data) => {
                this.dashboard.set(data);
                this.isLoading.set(false);
            },
            error: () => {
                this.error.set('Erro ao carregar dashboard financeiro');
                this.isLoading.set(false);
            },
        });
    }

    loadTransactions() {
        this.isLoading.set(true);
        this.financeService.getTransactionsByPeriod(this.startDate(), this.endDate()).subscribe({
            next: (data) => {
                this.transactions.set(data);
                this.isLoading.set(false);
            },
            error: () => {
                this.error.set('Erro ao carregar transações');
                this.isLoading.set(false);
            },
        });
    }

    loadUnreconciled() {
        this.isLoading.set(true);
        this.financeService.getUnreconciledTransactions().subscribe({
            next: (data) => {
                this.unreconciledTransactions.set(data);
                this.isLoading.set(false);
            },
            error: () => {
                this.error.set('Erro ao carregar transações não conciliadas');
                this.isLoading.set(false);
            },
        });
    }

    switchTab(tab: 'dashboard' | 'transactions' | 'unreconciled') {
        this.activeTab.set(tab);
        if (tab === 'dashboard') this.loadDashboard();
        else if (tab === 'transactions') this.loadTransactions();
        else this.loadUnreconciled();
    }

    reconcileTransaction(id: string) {
        this.financeService.reconcileTransaction(id, {}).subscribe({
            next: () => {
                this.successMessage.set('Transação conciliada com sucesso');
                this.loadUnreconciled();
                setTimeout(() => this.successMessage.set(null), 3000);
            },
            error: () => this.error.set('Erro ao conciliar transação'),
        });
    }

    applyPeriodFilter() {
        const tab = this.activeTab();
        if (tab === 'dashboard') this.loadDashboard();
        else if (tab === 'transactions') this.loadTransactions();
    }

    formatCurrency(value: number): string {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    }

    formatDate(date: string | undefined): string {
        if (!date) return '—';
        return new Date(date).toLocaleDateString('pt-BR');
    }
}
