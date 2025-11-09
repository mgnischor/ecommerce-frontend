import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Home page component.
 * Displays the main landing page of the e-commerce application.
 */
@Component({
    selector: 'page-home',
    imports: [CommonModule],
    templateUrl: './home.html',
    styleUrl: './home.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {}
