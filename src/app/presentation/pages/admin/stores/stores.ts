import { Component, ChangeDetectionStrategy, inject, signal, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { StoreService } from '../../../../infrastructure/services';
import { Store } from '../../../../domain/models';

@Component({
    selector: 'app-admin-stores',
    imports: [FormsModule],
    templateUrl: './stores.html',
    styleUrl: './stores.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminStores implements OnInit {
    private readonly storeService = inject(StoreService);

    stores = signal<Store[]>([]);
    isLoading = signal(false);
    error = signal<string | null>(null);
    successMessage = signal<string | null>(null);
    searchCity = signal('');

    showFormModal = signal(false);
    editingStore = signal<Store | null>(null);
    formData = signal<Partial<Store>>({
        storeCode: '',
        name: '',
        description: '',
        email: '',
        phoneNumber: '',
        address: '',
        city: '',
        state: '',
        postalCode: '',
        country: 'BR',
        timezone: 'America/Sao_Paulo',
        currency: 'BRL',
        isActive: true,
        supportsPickup: false,
        supportsDelivery: true,
    });

    ngOnInit() {
        this.loadStores();
    }

    loadStores() {
        this.isLoading.set(true);
        this.error.set(null);

        this.storeService.getStores().subscribe({
            next: (data) => {
                this.stores.set(data);
                this.isLoading.set(false);
            },
            error: () => {
                this.error.set('Erro ao carregar lojas');
                this.isLoading.set(false);
            },
        });
    }

    searchByCity() {
        const city = this.searchCity();
        if (!city) {
            this.loadStores();
            return;
        }

        this.isLoading.set(true);
        this.storeService.searchStoresByCity(city).subscribe({
            next: (data) => {
                this.stores.set(data);
                this.isLoading.set(false);
            },
            error: () => {
                this.stores.set([]);
                this.isLoading.set(false);
            },
        });
    }

    openCreateModal() {
        this.editingStore.set(null);
        this.formData.set({
            storeCode: '',
            name: '',
            description: '',
            email: '',
            phoneNumber: '',
            address: '',
            city: '',
            state: '',
            postalCode: '',
            country: 'BR',
            timezone: 'America/Sao_Paulo',
            currency: 'BRL',
            isActive: true,
            supportsPickup: false,
            supportsDelivery: true,
        });
        this.showFormModal.set(true);
    }

    openEditModal(store: Store) {
        this.editingStore.set(store);
        this.formData.set({ ...store });
        this.showFormModal.set(true);
    }

    closeFormModal() {
        this.showFormModal.set(false);
        this.editingStore.set(null);
    }

    saveStore() {
        const editing = this.editingStore();
        const data = this.formData();

        if (editing) {
            this.storeService.updateStore(editing.id, data).subscribe({
                next: () => {
                    this.successMessage.set('Loja atualizada com sucesso');
                    this.closeFormModal();
                    this.loadStores();
                    setTimeout(() => this.successMessage.set(null), 3000);
                },
                error: () => this.error.set('Erro ao atualizar loja'),
            });
        } else {
            this.storeService.createStore(data).subscribe({
                next: () => {
                    this.successMessage.set('Loja criada com sucesso');
                    this.closeFormModal();
                    this.loadStores();
                    setTimeout(() => this.successMessage.set(null), 3000);
                },
                error: () => this.error.set('Erro ao criar loja'),
            });
        }
    }

    deleteStore(id: string) {
        if (!confirm('Tem certeza que deseja excluir esta loja?')) return;

        this.storeService.deleteStore(id).subscribe({
            next: () => {
                this.successMessage.set('Loja excluída com sucesso');
                this.loadStores();
                setTimeout(() => this.successMessage.set(null), 3000);
            },
            error: () => this.error.set('Erro ao excluir loja'),
        });
    }

    updateFormField(field: string, value: unknown) {
        this.formData.update((data) => ({ ...data, [field]: value }));
    }
}
