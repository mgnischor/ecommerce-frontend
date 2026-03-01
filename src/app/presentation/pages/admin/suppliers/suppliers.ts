import { Component, ChangeDetectionStrategy, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupplierService } from '../../../../infrastructure/services';
import { Supplier } from '../../../../domain/models';

@Component({
    selector: 'app-admin-suppliers',
    imports: [CommonModule, FormsModule],
    templateUrl: './suppliers.html',
    styleUrl: './suppliers.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminSuppliers implements OnInit {
    private supplierService = inject(SupplierService);

    suppliers = signal<Supplier[]>([]);
    isLoading = signal(false);
    error = signal<string | null>(null);
    successMessage = signal<string | null>(null);
    searchTerm = signal('');

    showFormModal = signal(false);
    editingSupplier = signal<Supplier | null>(null);
    formData = signal<Partial<Supplier>>({
        companyName: '',
        supplierCode: '',
        contactName: '',
        email: '',
        phoneNumber: '',
        address: '',
        city: '',
        state: '',
        postalCode: '',
        country: 'BR',
        isActive: true,
        isPreferred: false,
        leadTimeDays: 7,
        rating: 0,
    });

    ngOnInit() {
        this.loadSuppliers();
    }

    loadSuppliers() {
        this.isLoading.set(true);
        this.error.set(null);

        this.supplierService.getSuppliers().subscribe({
            next: (data) => {
                this.suppliers.set(data);
                this.isLoading.set(false);
            },
            error: () => {
                this.error.set('Erro ao carregar fornecedores');
                this.isLoading.set(false);
            },
        });
    }

    searchSuppliers() {
        const term = this.searchTerm();
        if (!term) {
            this.loadSuppliers();
            return;
        }

        this.isLoading.set(true);
        this.supplierService.searchSuppliers(term).subscribe({
            next: (data) => {
                this.suppliers.set(data);
                this.isLoading.set(false);
            },
            error: () => {
                this.suppliers.set([]);
                this.isLoading.set(false);
            },
        });
    }

    openCreateModal() {
        this.editingSupplier.set(null);
        this.formData.set({
            companyName: '',
            supplierCode: '',
            contactName: '',
            email: '',
            phoneNumber: '',
            address: '',
            city: '',
            state: '',
            postalCode: '',
            country: 'BR',
            isActive: true,
            isPreferred: false,
            leadTimeDays: 7,
            rating: 0,
        });
        this.showFormModal.set(true);
    }

    openEditModal(supplier: Supplier) {
        this.editingSupplier.set(supplier);
        this.formData.set({ ...supplier });
        this.showFormModal.set(true);
    }

    closeFormModal() {
        this.showFormModal.set(false);
        this.editingSupplier.set(null);
    }

    saveSupplier() {
        const editing = this.editingSupplier();
        const data = this.formData();

        if (editing) {
            this.supplierService.updateSupplier(editing.id, data).subscribe({
                next: () => {
                    this.successMessage.set('Fornecedor atualizado com sucesso');
                    this.closeFormModal();
                    this.loadSuppliers();
                    setTimeout(() => this.successMessage.set(null), 3000);
                },
                error: () => this.error.set('Erro ao atualizar fornecedor'),
            });
        } else {
            this.supplierService.createSupplier(data).subscribe({
                next: () => {
                    this.successMessage.set('Fornecedor criado com sucesso');
                    this.closeFormModal();
                    this.loadSuppliers();
                    setTimeout(() => this.successMessage.set(null), 3000);
                },
                error: () => this.error.set('Erro ao criar fornecedor'),
            });
        }
    }

    deleteSupplier(id: string) {
        if (!confirm('Tem certeza que deseja excluir este fornecedor?')) return;

        this.supplierService.deleteSupplier(id).subscribe({
            next: () => {
                this.successMessage.set('Fornecedor excluído com sucesso');
                this.loadSuppliers();
                setTimeout(() => this.successMessage.set(null), 3000);
            },
            error: () => this.error.set('Erro ao excluir fornecedor'),
        });
    }

    updateFormField(field: string, value: unknown) {
        this.formData.update((data) => ({ ...data, [field]: value }));
    }

    formatCurrency(value: number | undefined): string {
        if (value == null) return '—';
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    }
}
