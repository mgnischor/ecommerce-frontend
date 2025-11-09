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

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'products', component: ProductList },
    { path: 'products/:id', component: ProductDetail },
    { path: 'cart', component: Cart },
    { path: 'checkout', component: Checkout },
    { path: 'account', component: Account },
    { path: 'orders', component: Orders },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: '**', component: NotFound },
];
