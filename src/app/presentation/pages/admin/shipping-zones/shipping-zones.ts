import { Component, ChangeDetectionStrategy, inject, signal, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { ShippingZoneService } from '../../../../infrastructure/services';
import { ShippingZone } from '../../../../domain/models';

@Component({
    selector: 'app-admin-shipping-zones',
    imports: [FormsModule],
    templateUrl: './shipping-zones.html',
    styleUrl: './shipping-zones.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminShippingZones implements OnInit {
    private readonly shippingZoneService = inject(ShippingZoneService);

    zones = signal<ShippingZone[]>([]);
    isLoading = signal(false);
    error = signal<string | null>(null);
    successMessage = signal<string | null>(null);

    showFormModal = signal(false);
    editingZone = signal<ShippingZone | null>(null);
    formData = signal<Partial<ShippingZone>>({
        name: '',
        description: '',
        countries: [],
        states: [],
        postalCodes: [],
        baseRate: 0,
        ratePerKg: undefined,
        ratePerItem: undefined,
        freeShippingThreshold: undefined,
        estimatedDeliveryDaysMin: 1,
        estimatedDeliveryDaysMax: 5,
        availableShippingMethods: [],
        priority: 0,
        isActive: true,
    });

    countriesInput = signal('');
    statesInput = signal('');
    methodsInput = signal('');

    ngOnInit() {
        this.loadZones();
    }

    loadZones() {
        this.isLoading.set(true);
        this.error.set(null);

        this.shippingZoneService.getShippingZones().subscribe({
            next: (data) => {
                this.zones.set(data);
                this.isLoading.set(false);
            },
            error: () => {
                this.error.set('Erro ao carregar zonas de envio');
                this.isLoading.set(false);
            },
        });
    }

    openCreateModal() {
        this.editingZone.set(null);
        this.formData.set({
            name: '',
            description: '',
            countries: [],
            states: [],
            postalCodes: [],
            baseRate: 0,
            estimatedDeliveryDaysMin: 1,
            estimatedDeliveryDaysMax: 5,
            availableShippingMethods: [],
            priority: 0,
            isActive: true,
        });
        this.countriesInput.set('');
        this.statesInput.set('');
        this.methodsInput.set('');
        this.showFormModal.set(true);
    }

    openEditModal(zone: ShippingZone) {
        this.editingZone.set(zone);
        this.formData.set({ ...zone });
        this.countriesInput.set(zone.countries.join(', '));
        this.statesInput.set(zone.states.join(', '));
        this.methodsInput.set(zone.availableShippingMethods.join(', '));
        this.showFormModal.set(true);
    }

    closeFormModal() {
        this.showFormModal.set(false);
        this.editingZone.set(null);
    }

    saveZone() {
        const editing = this.editingZone();
        const data = {
            ...this.formData(),
            countries: this.countriesInput()
                .split(',')
                .map((s) => s.trim())
                .filter(Boolean),
            states: this.statesInput()
                .split(',')
                .map((s) => s.trim())
                .filter(Boolean),
            availableShippingMethods: this.methodsInput()
                .split(',')
                .map((s) => s.trim())
                .filter(Boolean),
        };

        if (editing) {
            this.shippingZoneService.updateShippingZone(editing.id, data).subscribe({
                next: () => {
                    this.successMessage.set('Zona de envio atualizada com sucesso');
                    this.closeFormModal();
                    this.loadZones();
                    setTimeout(() => this.successMessage.set(null), 3000);
                },
                error: () => this.error.set('Erro ao atualizar zona de envio'),
            });
        } else {
            this.shippingZoneService.createShippingZone(data).subscribe({
                next: () => {
                    this.successMessage.set('Zona de envio criada com sucesso');
                    this.closeFormModal();
                    this.loadZones();
                    setTimeout(() => this.successMessage.set(null), 3000);
                },
                error: () => this.error.set('Erro ao criar zona de envio'),
            });
        }
    }

    deleteZone(id: string) {
        if (!confirm('Tem certeza que deseja excluir esta zona de envio?')) return;

        this.shippingZoneService.deleteShippingZone(id).subscribe({
            next: () => {
                this.successMessage.set('Zona de envio excluída com sucesso');
                this.loadZones();
                setTimeout(() => this.successMessage.set(null), 3000);
            },
            error: () => this.error.set('Erro ao excluir zona de envio'),
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
