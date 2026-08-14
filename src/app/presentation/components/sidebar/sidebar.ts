import { Component, ChangeDetectionStrategy, signal, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateService, TranslatePipe } from '../../../infrastructure/i18n';

/**
 * Sidebar component.
 * Displays the navigation sidebar with menu items.
 */
@Component({
    selector: 'app-sidebar',
    imports: [RouterLink, RouterLinkActive, TranslatePipe],
    templateUrl: './sidebar.html',
    styleUrl: './sidebar.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sidebar {
    private readonly t = inject(TranslateService);

    private readonly menuItems = computed(() => [
        { path: '/', label: this.t.get('sidebar.home'), icon: 'bi-house' },
        { path: '/products', label: this.t.get('sidebar.products'), icon: 'bi-grid' },
        { path: '/cart', label: this.t.get('sidebar.cart'), icon: 'bi-cart' },
        { path: '/orders', label: this.t.get('sidebar.myOrders'), icon: 'bi-box-seam' },
        { path: '/account', label: this.t.get('sidebar.myAccount'), icon: 'bi-person' },
    ]);
    readonly items = computed(() => this.menuItems());

    private readonly adminItems = computed(() => [
        { path: '/admin/shipments', label: this.t.get('sidebar.shipments'), icon: 'bi-truck' },
        {
            path: '/admin/refunds',
            label: this.t.get('sidebar.refunds'),
            icon: 'bi-arrow-return-left',
        },
        { path: '/admin/promotions', label: this.t.get('sidebar.promotions'), icon: 'bi-tag' },
        { path: '/admin/vendors', label: this.t.get('sidebar.vendors'), icon: 'bi-shop' },
        { path: '/admin/finance', label: this.t.get('sidebar.finance'), icon: 'bi-graph-up' },
        { path: '/admin/inventory', label: this.t.get('sidebar.inventory'), icon: 'bi-archive' },
        { path: '/admin/stores', label: this.t.get('sidebar.stores'), icon: 'bi-building' },
        { path: '/admin/suppliers', label: this.t.get('sidebar.suppliers'), icon: 'bi-people' },
        {
            path: '/admin/shipping-zones',
            label: this.t.get('sidebar.shippingZones'),
            icon: 'bi-geo-alt',
        },
        { path: '/admin/payments', label: this.t.get('sidebar.payments'), icon: 'bi-credit-card' },
        { path: '/admin/customers', label: this.t.get('sidebar.customers'), icon: 'bi-people' },
        {
            path: '/admin/gift-cards',
            label: this.t.get('sidebar.giftCards'),
            icon: 'bi-gift',
        },
        { path: '/admin/rewards', label: this.t.get('sidebar.rewards'), icon: 'bi-star' },
        { path: '/admin/invoices', label: this.t.get('sidebar.invoices'), icon: 'bi-receipt' },
        {
            path: '/admin/accounting',
            label: this.t.get('sidebar.accounting'),
            icon: 'bi-journal-text',
        },
    ]);
    readonly admin = computed(() => this.adminItems());
}
