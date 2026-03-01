import { Component, ChangeDetectionStrategy, inject, signal, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VendorService } from '../../../../infrastructure/services';
import { Vendor, VendorStatus } from '../../../../domain/models';

@Component({
    selector: 'app-admin-vendors',
    imports: [CommonModule, FormsModule],
    templateUrl: './vendors.html',
    styleUrl: './vendors.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminVendors implements OnInit {
    private vendorService = inject(VendorService);

    vendors = signal<Vendor[]>([]);
    isLoading = signal(false);
    error = signal<string | null>(null);
    successMessage = signal<string | null>(null);
    currentPage = signal(1);
    pageSize = signal(10);
    totalCount = signal(0);
    totalPages = computed(() => Math.ceil(this.totalCount() / this.pageSize()));
    searchTerm = signal('');
    showFeaturedOnly = signal(false);

    showFormModal = signal(false);
    formData = signal<Partial<Vendor>>({
        name: '',
        email: '',
        phoneNumber: '',
        description: '',
        websiteUrl: '',
        isFeatured: false,
    });

    ngOnInit() {
        this.loadVendors();
    }

    loadVendors() {
        this.isLoading.set(true);
        this.error.set(null);

        if (this.showFeaturedOnly()) {
            this.vendorService.getFeaturedVendors().subscribe({
                next: (data) => {
                    this.vendors.set(data);
                    this.totalCount.set(data.length);
                    this.isLoading.set(false);
                },
                error: () => {
                    this.error.set('Erro ao carregar fornecedores');
                    this.isLoading.set(false);
                },
            });
        } else {
            this.vendorService.getVendors(this.currentPage(), this.pageSize()).subscribe({
                next: (data) => {
                    this.vendors.set(data.items);
                    this.totalCount.set(data.totalCount);
                    this.isLoading.set(false);
                },
                error: () => {
                    this.error.set('Erro ao carregar fornecedores');
                    this.isLoading.set(false);
                },
            });
        }
    }

    searchVendors() {
        const term = this.searchTerm();
        if (!term) {
            this.loadVendors();
            return;
        }

        this.isLoading.set(true);
        this.vendorService.searchVendors(term).subscribe({
            next: (data) => {
                this.vendors.set(data);
                this.totalCount.set(data.length);
                this.isLoading.set(false);
            },
            error: () => {
                this.vendors.set([]);
                this.isLoading.set(false);
            },
        });
    }

    toggleFeatured() {
        this.showFeaturedOnly.update((v) => !v);
        this.loadVendors();
    }

    openCreateModal() {
        this.formData.set({
            name: '',
            email: '',
            phoneNumber: '',
            description: '',
            websiteUrl: '',
            isFeatured: false,
        });
        this.showFormModal.set(true);
    }

    closeFormModal() {
        this.showFormModal.set(false);
    }

    saveVendor() {
        this.vendorService.createVendor(this.formData()).subscribe({
            next: () => {
                this.successMessage.set('Fornecedor criado com sucesso');
                this.closeFormModal();
                this.loadVendors();
                setTimeout(() => this.successMessage.set(null), 3000);
            },
            error: () => this.error.set('Erro ao criar fornecedor'),
        });
    }

    updateFormField(field: string, value: unknown) {
        this.formData.update((data) => ({ ...data, [field]: value }));
    }

    onPageChange(page: number) {
        this.currentPage.set(page);
        this.loadVendors();
    }

    getStatusLabel(status: VendorStatus): string {
        const labels: Record<number, string> = {
            [VendorStatus.Active]: 'Ativo',
            [VendorStatus.Inactive]: 'Inativo',
            [VendorStatus.Suspended]: 'Suspenso',
        };
        return labels[status] ?? 'Desconhecido';
    }

    getStatusClass(status: VendorStatus): string {
        const classes: Record<number, string> = {
            [VendorStatus.Active]: 'status-active',
            [VendorStatus.Inactive]: 'status-inactive',
            [VendorStatus.Suspended]: 'status-cancelled',
        };
        return classes[status] ?? '';
    }
}
