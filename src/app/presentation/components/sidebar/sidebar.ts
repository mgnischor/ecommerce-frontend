import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

/**
 * Sidebar component.
 * Displays the navigation sidebar with menu items.
 */
@Component({
    selector: 'app-sidebar',
    imports: [RouterLink, RouterLinkActive],
    templateUrl: './sidebar.html',
    styleUrl: './sidebar.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sidebar {
    private readonly menuItems = signal([
        { path: '/', label: 'Home', icon: 'bi-house' },
        { path: '/products', label: 'Produtos', icon: 'bi-grid' },
        { path: '/cart', label: 'Carrinho', icon: 'bi-cart' },
        { path: '/orders', label: 'Meus Pedidos', icon: 'bi-box-seam' },
        { path: '/account', label: 'Minha Conta', icon: 'bi-person' },
    ]);
    readonly items = computed(() => this.menuItems());

    private readonly adminItems = signal([
        { path: '/admin/shipments', label: 'Envios', icon: 'bi-truck' },
        { path: '/admin/refunds', label: 'Reembolsos', icon: 'bi-arrow-return-left' },
        { path: '/admin/promotions', label: 'Promoções', icon: 'bi-tag' },
        { path: '/admin/vendors', label: 'Vendedores', icon: 'bi-shop' },
        { path: '/admin/finance', label: 'Financeiro', icon: 'bi-graph-up' },
        { path: '/admin/inventory', label: 'Inventário', icon: 'bi-archive' },
        { path: '/admin/stores', label: 'Lojas', icon: 'bi-building' },
        { path: '/admin/suppliers', label: 'Fornecedores', icon: 'bi-people' },
        { path: '/admin/shipping-zones', label: 'Zonas de Envio', icon: 'bi-geo-alt' },
    ]);
    readonly admin = computed(() => this.adminItems());
}
