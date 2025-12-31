import { effect, inject, PLATFORM_ID, Signal } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { APPLICATION_ROUTES } from '../../../shared/variables/application-routes';
import { IT_USER_REPOSITORY } from '../../../core/repositories/user.repository';
import { M_User } from '../../../core/models/user.model';
import { E_RedirectUser } from '../../../shared/variables/redirect-user-state';
import { isPlatformBrowser } from '@angular/common';

/**
 * Authguard for checking user routes and only give access to if user is logged in.
 * @returns
 */
export const authGuard: CanActivateFn = () => {
    const userRepository = inject(IT_USER_REPOSITORY);
    const platformID = inject(PLATFORM_ID);
    const router = inject(Router);
    const userSignal: Signal<M_User | null> = userRepository.getUser();

    effect(() => {
        if (userSignal() === null) {
            // show no access message in UI
            router.navigate([APPLICATION_ROUTES.login.route.path!], {
                queryParams: { error: E_RedirectUser.notAuthorized },
            });
        }
    });

    if (!isPlatformBrowser(platformID)) return true;

    return userSignal() !== null;
};
