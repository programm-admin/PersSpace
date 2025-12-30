import { inject, Injectable } from '@angular/core';
import { IT_USER_REPOSITORY } from '../../repositories/user.repository';
import { IT_STORAGE_REPOSITORY } from '../../repositories/storage.repository';
import { catchError, tap, throwError } from 'rxjs';
import { M_User } from '../../models/user.model';

/**
 * Use case class for getting user from backend for checking whether user session is still active.
 */
@Injectable()
export class UC_User_GetUserFromBackend {
    private readonly userRepository = inject(IT_USER_REPOSITORY);
    private readonly storageRepository = inject(IT_STORAGE_REPOSITORY);

    public execute = (updateAccessToken: boolean) => {
        return this.userRepository.getUserFromBackend().pipe(
            tap((response: M_User) => {
                // user is logged in -> session is valid
                this.storageRepository.setUserToStorage(response, updateAccessToken);
            }),
            catchError((err) => {
                // user is not logged in -> session invalid or expired
                this.userRepository.setUser(null);
                return throwError(() => err);
            }),
        );
    };
}
