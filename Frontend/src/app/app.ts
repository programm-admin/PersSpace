import { Component } from '@angular/core';
import { CompAppLayout } from './presentation/layout/comp-app-layout/comp-app-layout';

@Component({
    selector: 'app-root',
    imports: [CompAppLayout],
    templateUrl: './app.html',
    styleUrl: './app.scss',
})
export class App {
    isCollapsed = false;
}
