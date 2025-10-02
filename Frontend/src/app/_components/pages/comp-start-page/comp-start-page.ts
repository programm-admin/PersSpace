import { Component, inject, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { APPLICATION_ROUTES } from '../../../shared/variables/application-routes';
import { UC_User_GetIsUserLoggedIn } from '../../../core/use-cases/user/get-is-user-logged-in.use-case';
import { CompLoadingScreen } from '../../layout/comp-loading-screen/comp-loading-screen';

@Component({
    selector: 'app-comp-start-page',
    imports: [NzButtonModule, CompLoadingScreen],
    templateUrl: './comp-start-page.html',
    styleUrl: './comp-start-page.scss',
    providers: [UC_User_GetIsUserLoggedIn],
})
export class CompStartPage implements OnInit {
    public readonly getIsUserLoggedInUseCase = inject(UC_User_GetIsUserLoggedIn);
    public router = inject(Router);
    public isUserLoggedIn: Signal<boolean> = signal<boolean>(false);
    public isLoading: boolean = false;

    ngOnInit(): void {
        this.isLoading = true;
        this.isUserLoggedIn = this.getIsUserLoggedInUseCase.execute();
        this.isLoading = false;
    }

    navigateToPage = (toUserStart: boolean) => {
        this.router.navigateByUrl(
            toUserStart
                ? APPLICATION_ROUTES.userStart.route.path!
                : APPLICATION_ROUTES.login.route.path!,
        );
    };
}
