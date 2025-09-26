import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UC_User_GetIsUserLoggedIn } from '../../core/use-cases/user/get-is-user-logged-in.use-case';
import { UC_String_GetPathFromRoute } from '../../core/use-cases/string/get-path-from-route.use-case';
import { APPLICATION_ROUTES } from '../../shared/variables/application-routes';

export const authGuard: CanActivateFn = (route, state) => {
    const getIsLoggedInUseCase = inject(UC_User_GetIsUserLoggedIn);
    const getPathForRouteUseCase = inject(UC_String_GetPathFromRoute);
    const router = inject(Router);

    if (!getIsLoggedInUseCase.execute()()) {
        router.navigate([getPathForRouteUseCase.execute(APPLICATION_ROUTES.start)]);
        return false;
    }

    return true;
};
