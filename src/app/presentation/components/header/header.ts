import { Component, ChangeDetectionStrategy, output, signal, computed } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

/**
 * Header component.
 * Displays the application header with navigation and branding.
 */
@Component({
    selector: 'app-header',
    imports: [RouterLink, RouterLinkActive, NgbCollapseModule],
    templateUrl: './header.html',
    styleUrl: './header.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
    readonly toggleSidebar = output<void>();
    protected readonly isMenuCollapsed = signal(true);
    readonly menuCollapsed = computed(() => this.isMenuCollapsed());

    onToggleSidebar(): void {
        this.toggleSidebar.emit();
    }

    toggleMenu(): void {
        this.isMenuCollapsed.update((collapsed) => !collapsed);
    }
}
