import { CanActivateFn, Router } from '@angular/router';
import { inject, PLATFORM_ID, effect } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { IT_USER_REPOSITORY } from '../../../core/repositories/user.repository';
import { APPLICATION_ROUTES } from '../../../shared/variables/application-routes';
import { E_RedirectUser } from '../../../shared/variables/redirect-user-state';

export const authGuard: CanActivateFn = () => {
    const userRepository = inject(IT_USER_REPOSITORY);
    const router = inject(Router);
    const platformID = inject(PLATFORM_ID);

    const userSignal = userRepository.getUser();

    // logout user if not available in browser
    effect(() => {
        if (isPlatformBrowser(platformID) && userSignal() === null) {
            router.navigate([APPLICATION_ROUTES.login.route.path!], {
                queryParams: { error: E_RedirectUser.notAuthorized },
            });
        }
    });

    if (!isPlatformBrowser(platformID)) {
        return true;
    }

    return userSignal() !== null;
};
