import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';

import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CartService, OrderService, AuthService } from '../../../infrastructure/services';
import { PaymentMethod } from '../../../domain/models';

/**
 * Checkout page component.
 * Handles the order completion and payment process.
 */
@Component({
    selector: 'app-checkout',
    imports: [ReactiveFormsModule, RouterLink],
    templateUrl: './checkout.html',
    styleUrl: './checkout.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Checkout {
    cartService = inject(CartService);
    private readonly orderService = inject(OrderService);
    private readonly authService = inject(AuthService);
    private readonly router = inject(Router);

    isLoading = signal(false);
    error = signal<string | null>(null);
    currentStep = signal<'address' | 'payment' | 'review'>('address');

    paymentMethods = [
        { value: PaymentMethod.CreditCard, label: 'Cartão de Crédito' },
        { value: PaymentMethod.DebitCard, label: 'Cartão de Débito' },
        { value: PaymentMethod.PayPal, label: 'PayPal' },
        { value: PaymentMethod.BankTransfer, label: 'Transferência Bancária' },
        { value: PaymentMethod.Cash, label: 'Dinheiro' },
    ];

    addressForm = new FormGroup({
        street: new FormControl('', [Validators.required]),
        city: new FormControl('', [Validators.required]),
        state: new FormControl('', [Validators.required]),
        postalCode: new FormControl('', [Validators.required]),
        country: new FormControl('Brasil', [Validators.required]),
    });

    paymentForm = new FormGroup({
        paymentMethod: new FormControl<PaymentMethod>(PaymentMethod.CreditCard, [
            Validators.required,
        ]),
    });

    goToPayment() {
        if (this.addressForm.invalid) {
            this.addressForm.markAllAsTouched();
            return;
        }
        this.currentStep.set('payment');
    }

    goToReview() {
        this.currentStep.set('review');
    }

    goBack(step: 'address' | 'payment') {
        this.currentStep.set(step);
    }

    placeOrder() {
        const user = this.authService.currentUser();
        if (!user) {
            this.router.navigate(['/login']);
            return;
        }

        if (this.cartService.cartItems().length === 0) {
            this.error.set('Carrinho vazio');
            return;
        }

        this.isLoading.set(true);
        this.error.set(null);

        const address = this.addressForm.value;
        const items = this.cartService.cartItems().map((item) => ({
            productId: item.productId,
            productVariantId: item.productVariantId,
            quantity: item.quantity,
        }));

        this.orderService
            .createOrder({
                customerId: user.userId,
                paymentMethod: this.paymentForm.value.paymentMethod!,
                items,
                shippingAddress: {
                    street: address.street!,
                    city: address.city!,
                    state: address.state!,
                    postalCode: address.postalCode!,
                    country: address.country!,
                },
            })
            .subscribe({
                next: () => {
                    this.isLoading.set(false);
                    this.cartService.clearCart();
                    this.router.navigate(['/orders']);
                },
                error: () => {
                    this.isLoading.set(false);
                    this.error.set('Erro ao realizar pedido. Tente novamente.');
                },
            });
    }

    formatPrice(price: number): string {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(price);
    }

    getPaymentLabel(method: PaymentMethod): string {
        return this.paymentMethods.find((m) => m.value === method)?.label ?? '';
    }
}
