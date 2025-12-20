import { Component, inject, input, InputSignal } from '@angular/core';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule, NzPlacementType } from 'ng-zorro-antd/dropdown';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';
import { T_ApplicationRoute } from '../../../../shared/types-and-interfaces/application-route';
import { getUserSettingsRoutes } from '../../../../shared/functions/get-visible-app-routes';
import { Router } from '@angular/router';
import { UC_User_LogoutUser } from '../../../../core/use-cases/user/logout-user.use-case';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { MENU_POSITION } from '../../../../shared/variables/menu-position';

@Component({
    selector: 'app-comp-user-button',
    imports: [NzAvatarModule, NzDropDownModule, NzTooltipModule, NzIconModule],
    templateUrl: './comp-user-button.html',
    styleUrl: './comp-user-button.scss',
    providers: [UC_User_LogoutUser],
})
export class CompUserButton {
    // dependency injedtions
    private router = inject(Router);
    private logoutUserUseCase = inject(UC_User_LogoutUser);

    public readonly menuPosition: NzPlacementType = MENU_POSITION;

    // input variables
    public inpButtonContent: InputSignal<string> = input.required<string>();
    public userMenu: T_ApplicationRoute[] = getUserSettingsRoutes();

    public navigateToItemPage = (path: string | undefined) => {
        if (!path) return;

        this.router.navigateByUrl(path);
    };

    public logoutUser = () => {
        this.logoutUserUseCase.execute();
    };
}
