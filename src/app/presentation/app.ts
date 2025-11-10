import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Layout } from './components/layout/layout';

@Component({
    selector: 'app-root',
    imports: [Layout],
    templateUrl: './app.html',
    styleUrl: './app.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
