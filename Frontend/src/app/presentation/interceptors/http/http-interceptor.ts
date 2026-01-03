import {
    HttpErrorResponse,
    HttpHandlerFn,
    HttpInterceptorFn,
    HttpRequest,
} from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { IT_LOADING_REPOSITORY } from '../../../core/repositories/loading.repository';
import { catchError, finalize, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { APPLICATION_ROUTES } from '../../../shared/variables/application-routes';
import { E_RedirectUser } from '../../../shared/variables/redirect-user-state';
import { isPlatformBrowser } from '@angular/common';

export const httpInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
    const loadingRepository = inject(IT_LOADING_REPOSITORY);
    const router = inject(Router);
    const platformID = inject(PLATFORM_ID);

    loadingRepository.showLoading();
    return next(req).pipe(
        catchError((err: HttpErrorResponse) => {
            if (err.status === 401 && isPlatformBrowser(platformID)) {
                router.navigate([APPLICATION_ROUTES.user.login.route.path!], {
                    queryParams: { error: E_RedirectUser.notAuthorized },
                });
            }

            return throwError(() => err);
        }),
        finalize(() => {
            loadingRepository.hideLoading();
        }),
    );
};
