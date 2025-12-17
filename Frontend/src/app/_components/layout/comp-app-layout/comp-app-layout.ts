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
import { UC_User_GetUser } from '../../../core/use-cases/user/get-user.use-case';

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
    providers: [
        UC_User_GetUserFromBackend,
        UC_User_GetUserFromLocalStorage,
        UC_User_LogoutUser,
        UC_User_GetUser,
    ],
})
export class CompAppLayout implements OnInit {
    private readonly getUserUseCase = inject(UC_User_GetUser);
    public readonly creationMenu: T_ApplicationRoute[] = getEventCreationRoutes();
    public readonly getUserFromBackendUseCase = inject(UC_User_GetUserFromBackend);
    public readonly logoutUserUseCase = inject(UC_User_LogoutUser);
    public readonly getUserFromLocalStorageUseCase = inject(UC_User_GetUserFromLocalStorage);

    public isLoading: boolean = false;
    public user: Signal<M_User | null> = signal(null);

    private readonly router = inject(Router);

    @ViewChild(NzDropdownMenuComponent, { static: false })
    menu!: NzDropdownMenuComponent;

    ngOnInit(): void {
        // this.isLoading = true;
        this.user = this.getUserUseCase.execute();

        const user: M_User | null = this.getUserFromLocalStorageUseCase.execute();

        this.getUserFromBackendUseCase.execute().subscribe({
            next: (user: M_User) => {
                this.isLoading = false;
            },
            error: (err) => {
                // error handling -> logout user
                this.logoutUserUseCase.execute();
                this.isLoading = false;
            },
        });
    }

    public navigateToItemPage = (path: string | undefined) => {
        if (!path) return;

        this.router.navigateByUrl(path);
    };

    public navigateToLoginPage = () => {
        this.router.navigateByUrl(APPLICATION_ROUTES.start.route.path!);
    };
}
