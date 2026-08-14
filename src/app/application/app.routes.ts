import { Routes } from '@angular/router';
import { Home } from '../presentation/pages/home/home';
import { ProductList } from '../presentation/pages/product-list/product-list';
import { ProductDetail } from '../presentation/pages/product-detail/product-detail';
import { Cart } from '../presentation/pages/cart/cart';
import { Checkout } from '../presentation/pages/checkout/checkout';
import { Account } from '../presentation/pages/account/account';
import { Orders } from '../presentation/pages/orders/orders';
import { Login } from '../presentation/pages/login/login';
import { Register } from '../presentation/pages/register/register';
import { NotFound } from '../presentation/pages/not-found/not-found';
import { authGuard, adminGuard } from '../infrastructure/guards';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'products', component: ProductList },
    { path: 'products/:id', component: ProductDetail },
    { path: 'cart', component: Cart },
    { path: 'checkout', component: Checkout, canActivate: [authGuard] },
    { path: 'account', component: Account, canActivate: [authGuard] },
    { path: 'orders', component: Orders, canActivate: [authGuard] },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    {
        path: 'admin',
        canActivate: [adminGuard],
        children: [
            {
                path: 'shipments',
                loadComponent: () =>
                    import('../presentation/pages/admin/shipments/shipments').then((m) => m.AdminShipments),
            },
            {
                path: 'refunds',
                loadComponent: () => import('../presentation/pages/admin/refunds/refunds').then((m) => m.AdminRefunds),
            },
            {
                path: 'promotions',
                loadComponent: () =>
                    import('../presentation/pages/admin/promotions/promotions').then((m) => m.AdminPromotions),
            },
            {
                path: 'vendors',
                loadComponent: () => import('../presentation/pages/admin/vendors/vendors').then((m) => m.AdminVendors),
            },
            {
                path: 'finance',
                loadComponent: () => import('../presentation/pages/admin/finance/finance').then((m) => m.AdminFinance),
            },
            {
                path: 'inventory',
                loadComponent: () =>
                    import('../presentation/pages/admin/inventory/inventory').then((m) => m.AdminInventory),
            },
            {
                path: 'stores',
                loadComponent: () => import('../presentation/pages/admin/stores/stores').then((m) => m.AdminStores),
            },
            {
                path: 'suppliers',
                loadComponent: () =>
                    import('../presentation/pages/admin/suppliers/suppliers').then((m) => m.AdminSuppliers),
            },
            {
                path: 'shipping-zones',
                loadComponent: () =>
                    import('../presentation/pages/admin/shipping-zones/shipping-zones').then(
                        (m) => m.AdminShippingZones
                    ),
            },
            {
                path: 'payments',
                loadComponent: () =>
                    import('../presentation/pages/admin/payments/payments').then(
                        (m) => m.AdminPayments,
                    ),
            },
            {
                path: 'customers',
                loadComponent: () =>
                    import('../presentation/pages/admin/customers/customers').then(
                        (m) => m.AdminCustomers,
                    ),
            },
            {
                path: 'gift-cards',
                loadComponent: () =>
                    import('../presentation/pages/admin/gift-cards/gift-cards').then(
                        (m) => m.AdminGiftCards,
                    ),
            },
            {
                path: 'rewards',
                loadComponent: () =>
                    import('../presentation/pages/admin/rewards/rewards').then(
                        (m) => m.AdminRewards,
                    ),
            },
            {
                path: 'invoices',
                loadComponent: () =>
                    import('../presentation/pages/admin/invoices/invoices').then(
                        (m) => m.AdminInvoices,
                    ),
            },
            {
                path: 'accounting',
                loadComponent: () =>
                    import('../presentation/pages/admin/accounting/accounting').then(
                        (m) => m.AdminAccounting,
                    ),
            },
        ],
    },
    { path: '**', component: NotFound },
];
