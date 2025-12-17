import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { getEventCreationRoutes } from '../../../shared/functions/get-visible-app-routes';
import { T_ApplicationRoute } from '../../../shared/types-and-interfaces/application-route';
import { UC_User_GetUserFromBackend } from '../../../core/use-cases/user/get-user-from-backend.use-case';
import { M_User } from '../../../core/models/user.model';
import { UC_User_GetUserFromLocalStorage } from '../../../core/use-cases/user/get-user-from-local-storage.use-case';
import { UC_User_LogoutUser } from '../../../core/use-cases/user/logout-user.use-case';
import { APPLICATION_ROUTES } from '../../../shared/variables/application-routes';

@Component({
    selector: 'app-comp-app-layout',
    imports: [RouterOutlet, NzLayoutModule, NzIconModule, NzTooltipModule, NzDropDownModule],
    templateUrl: './comp-app-layout.html',
    styleUrl: './comp-app-layout.scss',
    providers: [UC_User_GetUserFromBackend, UC_User_GetUserFromLocalStorage, UC_User_LogoutUser],
})
export class CompAppLayout implements OnInit {
    public readonly creationMenu: T_ApplicationRoute[] = getEventCreationRoutes();
    public readonly getUserFromBackendUseCase = inject(UC_User_GetUserFromBackend);
    public readonly logoutUserUseCase = inject(UC_User_LogoutUser);
    public readonly getUserFromLocalStorageUseCase = inject(UC_User_GetUserFromLocalStorage);
    public isLoading: boolean = false;

    private readonly router = inject(Router);

    ngOnInit(): void {
        // this.isLoading = true;

        const user: M_User | null = this.getUserFromLocalStorageUseCase.execute();
        console.log('[COMP EVENT FORM] user', user);


        this.getUserFromBackendUseCase.execute().subscribe({
            next: (user: M_User) => {
                this.isLoading = false;
            },
            error: (err) => {
                // error handling -> logout user
                // this.logoutUserUseCase.execute();
                console.log('[ERROR] from backend');
                this.isLoading = false;
            },
        });
    }

    public navigateToItemPage = (path: string | undefined) => {
        if (!path) return;

        this.router.navigateByUrl(path);
    };

    public navigateToLoginPage = () => {
        console.log('clicked');
        this.router.navigateByUrl(APPLICATION_ROUTES.start.route.path!);
    };
}
