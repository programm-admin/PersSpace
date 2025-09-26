import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

@Component({
    selector: 'app-comp-app-layout',
    imports: [RouterOutlet, NzLayoutModule],
    templateUrl: './comp-app-layout.html',
    styleUrl: './comp-app-layout.scss',
})
export class CompAppLayout {}
