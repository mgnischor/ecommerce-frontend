import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Product detail page component.
 * Displays detailed information about a specific product.
 */
@Component({
    selector: 'app-product-detail',
    imports: [CommonModule],
    templateUrl: './product-detail.html',
    styleUrl: './product-detail.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetail {}
