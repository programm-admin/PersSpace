import { Component } from '@angular/core';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@Component({
    selector: 'app-comp-loading-screen',
    imports: [NzSpinModule],
    templateUrl: './comp-loading-screen.html',
    styleUrl: './comp-loading-screen.scss',
})
export class CompLoadingScreen {}
