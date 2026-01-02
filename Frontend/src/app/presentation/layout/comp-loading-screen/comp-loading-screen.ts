import { Component, inject } from '@angular/core';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { IT_LOADING_REPOSITORY } from '../../../core/repositories/loading.repository';

@Component({
    selector: 'app-comp-loading-screen',
    imports: [NzSpinModule],
    templateUrl: './comp-loading-screen.html',
    styleUrl: './comp-loading-screen.scss',
})
export class CompLoadingScreen {}
