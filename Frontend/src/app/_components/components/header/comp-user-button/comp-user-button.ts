import {
    Component,
    effect,
    inject,
    input,
    InputSignal,
    OnInit,
    PLATFORM_ID,
    signal,
    Signal,
    WritableSignal,
} from '@angular/core';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule, NzPlacementType } from 'ng-zorro-antd/dropdown';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';
import { T_ApplicationRoute } from '../../../../shared/types-and-interfaces/application-route';
import { getUserSettingsRoutes } from '../../../../shared/functions/get-visible-app-routes';
import { Router } from '@angular/router';
import { UC_User_LogoutUser } from '../../../../core/use-cases/user/logout-user.use-case';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { MENU_POSITION } from '../../../../shared/variables/menu-position';
import { UC_User_GetUser } from '../../../../core/use-cases/user/get-user.use-case';
import { M_User } from '../../../../core/models/user.model';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { APPLICATION_ROUTES } from '../../../../shared/variables/application-routes';
import { UC_Message_ShowMessage } from '../../../../core/use-cases/message/show-message.use-case';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-comp-user-button',
    imports: [NzAvatarModule, NzDropDownModule, NzTooltipModule, NzIconModule, NzButtonModule],
    templateUrl: './comp-user-button.html',
    styleUrl: './comp-user-button.scss',
    providers: [UC_User_LogoutUser, UC_User_GetUser, UC_Message_ShowMessage],
})
export class CompUserButton implements OnInit {
    // dependency injections
    private readonly router = inject(Router);
    private readonly platformID = inject(PLATFORM_ID);
    private readonly UC_LogoutUser = inject(UC_User_LogoutUser);
    private readonly UC_GetUser = inject(UC_User_GetUser);
    private readonly UC_ShowMessage = inject(UC_Message_ShowMessage);

    public readonly menuPosition: NzPlacementType = MENU_POSITION;
    public user: Signal<M_User | null> = signal(null);
    public isPlatformBrowser: boolean = isPlatformBrowser(this.platformID);
    public avatarSrc: WritableSignal<string | undefined> = signal(undefined);

    // input variables
    public inpButtonName: InputSignal<string> = input.required<string>();
    public inpButtonPicture: InputSignal<string> = input.required<string>();

    public userMenu: T_ApplicationRoute[] = getUserSettingsRoutes();

    ngOnInit(): void {
        this.user = this.UC_GetUser.execute();
    }

    constructor() {
        effect(() => {
            const picture = this.inpButtonPicture();
            if (picture && !this.avatarSrc()) {
                this.avatarSrc.set(picture);
            }
        });
    }

    public navigateToItemPage = (path: string | undefined) => {
        if (!path) return;

        this.router.navigateByUrl(path);
    };

    public logoutUser = () => {
        this.UC_LogoutUser.execute();
        this.UC_ShowMessage.execute('success', 'Erfolgreich ausgeloggt.');
    };

    public navigateToLoginPage = () => {
        this.router.navigateByUrl(APPLICATION_ROUTES.login.route.path!);
    };
}
