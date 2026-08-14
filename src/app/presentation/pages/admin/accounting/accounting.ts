import { Component, ChangeDetectionStrategy, inject, signal, OnInit, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountingService } from '../../../../infrastructure/services';
import { ChartOfAccounts, JournalEntry } from '../../../../domain/models';

@Component({
    selector: 'app-admin-accounting',
    imports: [FormsModule],
    templateUrl: './accounting.html',
    styleUrl: './accounting.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminAccounting implements OnInit {
    private readonly accountingService = inject(AccountingService);

    activeTab = signal<'accounts' | 'journal'>('accounts');

    accounts = signal<ChartOfAccounts[]>([]);
    journalEntries = signal<JournalEntry[]>([]);
    selectedEntry = signal<JournalEntry | null>(null);

    isLoading = signal(false);
    error = signal<string | null>(null);

    currentPage = signal(1);
    pageSize = signal(10);
    totalEntries = signal(0);
    totalPages = computed(() => Math.ceil(this.totalEntries() / this.pageSize()));

    ngOnInit() {
        this.loadAccounts();
    }

    switchTab(tab: 'accounts' | 'journal') {
        this.activeTab.set(tab);
        if (tab === 'journal') this.loadJournalEntries();
        else this.loadAccounts();
    }

    loadAccounts() {
        this.isLoading.set(true);
        this.error.set(null);

        this.accountingService.getChartOfAccounts().subscribe({
            next: (data) => {
                this.accounts.set(data);
                this.isLoading.set(false);
            },
            error: () => {
                this.error.set('Erro ao carregar plano de contas');
                this.isLoading.set(false);
            },
        });
    }

    loadJournalEntries() {
        this.isLoading.set(true);
        this.error.set(null);

        this.accountingService.getJournalEntries(this.currentPage(), this.pageSize()).subscribe({
            next: (data) => {
                this.journalEntries.set(data);
                this.totalEntries.set(data.length);
                this.isLoading.set(false);
            },
            error: () => {
                this.error.set('Erro ao carregar lançamentos contábeis');
                this.isLoading.set(false);
            },
        });
    }

    viewEntry(entry: JournalEntry) {
        this.selectedEntry.set(entry);
    }

    closeDetail() {
        this.selectedEntry.set(null);
    }

    onPageChange(page: number) {
        this.currentPage.set(page);
        this.loadJournalEntries();
    }

    formatCurrency(value: number): string {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    }

    formatDate(date: string | undefined): string {
        if (!date) return '—';
        return new Date(date).toLocaleDateString('pt-BR');
    }
}
