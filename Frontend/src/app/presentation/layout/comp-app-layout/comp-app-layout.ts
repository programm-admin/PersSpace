import { Component, inject, OnInit, signal, Signal, ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';
import { NzDropdownMenuComponent, NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { getEventCreationRoutes } from '../../../shared/functions/get-visible-app-routes';
import { T_ApplicationRoute } from '../../../shared/types-and-interfaces/application-route';
import { UC_User_GetUserFromBackend } from '../../../core/use-cases/user/get-user-from-backend.use-case';
import { M_User } from '../../../core/models/user.model';
import { UC_User_GetUserFromLocalStorage } from '../../../core/use-cases/user/get-user-from-local-storage.use-case';
import { UC_User_LogoutUser } from '../../../core/use-cases/user/logout-user.use-case';
import { APPLICATION_ROUTES } from '../../../shared/variables/application-routes';
import { CompUserButton } from '../../components/header/comp-user-button/comp-user-button';
import { MENU_POSITION } from '../../../shared/variables/menu-position';
import { NzPlacementType } from 'ng-zorro-antd/dropdown';
import { IT_USER_REPOSITORY } from '../../../core/repositories/user.repository';
import { IT_LOADING_REPOSITORY } from '../../../core/repositories/loading.repository';

@Component({
    selector: 'app-comp-app-layout',
    imports: [
        RouterOutlet,
        NzLayoutModule,
        NzIconModule,
        NzTooltipModule,
        NzDropDownModule,
        CompUserButton,
    ],
    templateUrl: './comp-app-layout.html',
    styleUrl: './comp-app-layout.scss',
    providers: [UC_User_GetUserFromBackend, UC_User_GetUserFromLocalStorage, UC_User_LogoutUser],
})
export class CompAppLayout implements OnInit {
    // dependency injections
    private readonly userRepository = inject(IT_USER_REPOSITORY);
    public readonly creationMenu: T_ApplicationRoute[] = getEventCreationRoutes();
    public readonly getUserFromBackendUseCase = inject(UC_User_GetUserFromBackend);
    public readonly logoutUserUseCase = inject(UC_User_LogoutUser);
    public readonly getUserFromLocalStorageUseCase = inject(UC_User_GetUserFromLocalStorage);
    public readonly loadingRepository = inject(IT_LOADING_REPOSITORY);

    public readonly menuPosition: NzPlacementType = MENU_POSITION;
    public user: Signal<M_User | null> = signal(null);

    private readonly router = inject(Router);

    @ViewChild(NzDropdownMenuComponent, { static: false })
    menu!: NzDropdownMenuComponent;

    ngOnInit(): void {
        this.loadingRepository.showLoading();
        this.user = this.userRepository.getUser();
        this.getUserFromBackendUseCase.execute(false).subscribe();
    }

    public navigateToItemPage = (path: string | undefined) => {
        if (!path) return;

        this.router.navigateByUrl(path);
    };

    public navigateToLoginPage = () => {
        this.router.navigateByUrl(APPLICATION_ROUTES.start.route.path!);
    };
}
