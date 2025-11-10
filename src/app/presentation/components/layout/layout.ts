import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../header/header';
import { Sidebar } from '../sidebar/sidebar';
import { Footer } from '../footer/footer';

/**
 * Layout component.
 * Wraps the application with header, sidebar, main content, and footer.
 */
@Component({
    selector: 'app-layout',
    imports: [RouterOutlet, Header, Sidebar, Footer],
    templateUrl: './layout.html',
    styleUrl: './layout.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Layout {
    private readonly sidebarVisible = signal(false);
    readonly isSidebarVisible = computed(() => this.sidebarVisible());

    toggleSidebar(): void {
        this.sidebarVisible.update((visible) => !visible);
    }
}
