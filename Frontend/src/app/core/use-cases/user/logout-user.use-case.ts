import { inject, Injectable } from '@angular/core';
import { IT_USER_REPOSITORY } from '../../repositories/user.repository';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { APPLICATION_ROUTES } from '../../../shared/variables/application-routes';

@Injectable()
export class UC_User_LogoutUser {
    private readonly userRepository = inject(IT_USER_REPOSITORY);
    private readonly router = inject(Router);

    public execute = (): Observable<any> => {
        return this.userRepository.logoutUser().pipe(
            tap(() => this.router.navigateByUrl(APPLICATION_ROUTES.user.login.route.path!)),
            catchError((err) => throwError(() => err)),
        );
    };
}
