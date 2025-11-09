import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Product list page component.
 * Displays a list of available products in the e-commerce catalog.
 */
@Component({
    selector: 'page-product-list',
    imports: [CommonModule],
    templateUrl: './product-list.html',
    styleUrl: './product-list.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductList {}
