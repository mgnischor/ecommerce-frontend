import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Checkout page component.
 * Handles the order completion and payment process.
 */
@Component({
    selector: 'page-checkout',
    imports: [CommonModule],
    templateUrl: './checkout.html',
    styleUrl: './checkout.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Checkout {}
