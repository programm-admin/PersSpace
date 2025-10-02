import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { getEventCreationRoutes } from '../../../shared/functions/get-visible-app-routes';
import { T_ApplicationRoute } from '../../../shared/types-and-interfaces/application-route';

@Component({
    selector: 'app-comp-app-layout',
    imports: [RouterOutlet, NzLayoutModule, NzIconModule, NzTooltipModule, NzDropDownModule],
    templateUrl: './comp-app-layout.html',
    styleUrl: './comp-app-layout.scss',
})
export class CompAppLayout {
    public readonly creationMenu: T_ApplicationRoute[] = getEventCreationRoutes();

    private readonly router = inject(Router);

    public navigateToItemPage = (path: string | undefined) => {
        if (!path) return;

        this.router.navigateByUrl(path);
    };
}
