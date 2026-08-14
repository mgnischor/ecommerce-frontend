import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../../../../infrastructure/services';
import { Customer, CustomerSegment } from '../../../../domain/models';

@Component({
    selector: 'app-admin-customers',
    imports: [FormsModule],
    templateUrl: './customers.html',
    styleUrl: './customers.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminCustomers {
    private readonly customerService = inject(CustomerService);

    searchType = signal<'customerId' | 'userId'>('customerId');
    searchValue = signal('');
    customer = signal<Customer | null>(null);
    segment = signal<CustomerSegment | null>(null);
    isLoading = signal(false);
    error = signal<string | null>(null);

    search() {
        const value = this.searchValue();
        if (!value) return;

        this.isLoading.set(true);
        this.error.set(null);
        this.customer.set(null);
        this.segment.set(null);

        const query =
            this.searchType() === 'customerId'
                ? this.customerService.getCustomerById(value)
                : this.customerService.getCustomerByUserId(value);

        query.subscribe({
            next: (customer) => {
                this.customer.set(customer);
                this.loadSegment(customer.id);
                this.isLoading.set(false);
            },
            error: () => {
                this.customer.set(null);
                this.isLoading.set(false);
                this.error.set('Cliente não encontrado');
            },
        });
    }

    loadSegment(id: string) {
        this.customerService.getCustomerSegment(id).subscribe({
            next: (segment) => this.segment.set(segment),
            error: () => {},
        });
    }

    switchSearchType(type: 'customerId' | 'userId') {
        this.searchType.set(type);
        this.customer.set(null);
        this.segment.set(null);
    }

    formatCurrency(value: number): string {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    }

    formatDate(date: string | undefined): string {
        if (!date) return '—';
        return new Date(date).toLocaleDateString('pt-BR');
    }
}
