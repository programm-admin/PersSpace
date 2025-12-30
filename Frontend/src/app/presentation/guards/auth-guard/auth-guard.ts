import { effect, inject, Signal } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { APPLICATION_ROUTES } from '../../../shared/variables/application-routes';
import { IT_USER_REPOSITORY } from '../../../core/repositories/user.repository';
import { M_User } from '../../../core/models/user.model';

/**
 * Authguard for checking user routes and only give access to if user is logged in.
 * @returns
 */
export const authGuard: CanActivateFn = () => {
    const userRepository = inject(IT_USER_REPOSITORY);
    const router = inject(Router);
    const userSignal: Signal<M_User | null> = userRepository.getUser();

    effect(() => {
        if (userSignal() === null) {
            router.navigateByUrl(APPLICATION_ROUTES.login.route.path!);
        }
    });

    return userSignal() !== null;
};
