import { Component, computed, inject, OnInit, Signal, signal } from '@angular/core';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { APPLICATION_ROUTES } from '../../../shared/variables/application-routes';
import { UC_User_GetIsUserLoggedIn } from '../../../core/use-cases/user/get-is-user-logged-in.use-case';
import { CompLoadingScreen } from '../../layout/comp-loading-screen/comp-loading-screen';
import { UC_User_GetUser } from '../../../core/use-cases/user/get-user.use-case';

@Component({
    selector: 'app-comp-start-page',
    imports: [NzButtonModule, CompLoadingScreen],
    templateUrl: './comp-start-page.html',
    styleUrl: './comp-start-page.scss',
    providers: [UC_User_GetIsUserLoggedIn, UC_User_GetUser],
})
export class CompStartPage implements OnInit {
    public router = inject(Router);

    public readonly getIsUserLoggedInUseCase = inject(UC_User_GetIsUserLoggedIn);
    public readonly getUserUseCase = inject(UC_User_GetUser);

    public isUserLoggedIn: Signal<boolean> = signal<boolean>(false);
    public isLoading: boolean = false;

    ngOnInit(): void {
        // this.isLoading = true;
        this.isUserLoggedIn = computed(() => this.getUserUseCase.execute()() !== null);
        // this.isLoading = false;
    }

    navigateToPage = (toUserStart: boolean) => {
        this.router.navigateByUrl(
            toUserStart
                ? APPLICATION_ROUTES.user.userStart.route.path!
                : APPLICATION_ROUTES.user.login.route.path!,
        );
    };
}
