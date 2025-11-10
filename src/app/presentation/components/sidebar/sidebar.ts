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
        { path: '/products', label: 'Products', icon: 'bi-grid' },
        { path: '/cart', label: 'Shopping Cart', icon: 'bi-cart' },
        { path: '/orders', label: 'My Orders', icon: 'bi-box-seam' },
        { path: '/account', label: 'My Account', icon: 'bi-person' },
    ]);
    readonly items = computed(() => this.menuItems());
}
