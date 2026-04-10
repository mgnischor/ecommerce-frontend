import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';

import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CartService, OrderService, AuthService } from '../../../infrastructure/services';
import { TranslateService, TranslatePipe } from '../../../infrastructure/i18n';
import { PaymentMethod } from '../../../domain/models';

/**
 * Checkout page component.
 * Handles the order completion and payment process.
 */
@Component({
    selector: 'app-checkout',
    imports: [ReactiveFormsModule, RouterLink, TranslatePipe],
    templateUrl: './checkout.html',
    styleUrl: './checkout.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Checkout {
    cartService = inject(CartService);
    private readonly orderService = inject(OrderService);
    private readonly authService = inject(AuthService);
    private readonly router = inject(Router);
    private readonly t = inject(TranslateService);

    isLoading = signal(false);
    error = signal<string | null>(null);
    currentStep = signal<'address' | 'payment' | 'review'>('address');

    paymentMethods = [
        { value: PaymentMethod.CreditCard, labelKey: 'checkout.creditCard' },
        { value: PaymentMethod.DebitCard, labelKey: 'checkout.debitCard' },
        { value: PaymentMethod.PayPal, labelKey: 'checkout.paypal' },
        { value: PaymentMethod.BankTransfer, labelKey: 'checkout.bankTransfer' },
        { value: PaymentMethod.Cash, labelKey: 'checkout.cash' },
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
            this.error.set(this.t.get('checkout.emptyCartError'));
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
                    this.error.set(this.t.get('checkout.orderError'));
                },
            });
    }

    formatPrice(price: number): string {
        return this.t.formatPrice(price);
    }

    getPaymentLabel(method: PaymentMethod): string {
        const found = this.paymentMethods.find((m) => m.value === method);
        return found ? this.t.get(found.labelKey) : '';
    }
}
