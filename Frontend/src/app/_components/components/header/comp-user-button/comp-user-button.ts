import { Component, inject, input, InputSignal } from '@angular/core';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';
import { T_ApplicationRoute } from '../../../../shared/types-and-interfaces/application-route';
import { getUserSettingsRoutes } from '../../../../shared/functions/get-visible-app-routes';
import { Router } from '@angular/router';

@Component({
    selector: 'app-comp-user-button',
    imports: [NzAvatarModule, NzDropDownModule, NzTooltipModule],
    templateUrl: './comp-user-button.html',
    styleUrl: './comp-user-button.scss',
})
export class CompUserButton {
    // dependency injedtions
    private router = inject(Router);

    // input variables
    public inpButtonContent: InputSignal<string> = input.required<string>();
    public userMenu: T_ApplicationRoute[] = getUserSettingsRoutes();

    public navigateToItemPage = (path: string | undefined) => {
        if (!path) return;

        this.router.navigateByUrl(path);
    };
}
