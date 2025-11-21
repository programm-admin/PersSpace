import {
    computed,
    inject,
    Injectable,
    PLATFORM_ID,
    signal,
    Signal,
    WritableSignal,
} from '@angular/core';
import { T_UserRepository } from '../../core/repositories/user.repository';
import { catchError, EMPTY, Observable, tap, throwError } from 'rxjs';
import { M_User } from '../../core/models/user.model';
import { HttpClient } from '@angular/common/http';
import { LOCAL_STORAGE_KEYS } from '../../shared/variables/storage-keys';
import { isPlatformBrowser } from '@angular/common';
import { API_ROUTES } from '../../environment/api-routes';
import { StorageService } from './storage-service/storage-service';

@Injectable({
    providedIn: 'root',
})
export class UserService implements T_UserRepository {
    private http = inject(HttpClient);
    private readonly platformID = inject(PLATFORM_ID);
    private readonly storageService = inject(StorageService);

    private userSubject: WritableSignal<M_User | null> = signal<M_User | null>(
        (() => {
            if (!isPlatformBrowser(this.platformID)) {
                return null;
            }

            const image: string | null = localStorage.getItem(LOCAL_STORAGE_KEYS.KEY_USER_PICTURE);
            const userName: string | null = localStorage.getItem(LOCAL_STORAGE_KEYS.KEY_USER_NAME);
            const userID: string | null = localStorage.getItem(LOCAL_STORAGE_KEYS.KEY_USER_ID);

            return !image ||
                !userID ||
                !userName ||
                (image && !image.trim()) ||
                (userID && !userID.trim()) ||
                (userName && !userName.trim())
                ? null
                : {
                      id: userID,
                      image,
                      userName: userName,
                  };
        })(),
    );

    private readonly isLoggedIn: Signal<boolean> = computed(() => this.userSubject() !== null);

    public isUserLoggedIn = (): boolean => {
        return true;
    };

    /**
     * Function for checking whether user is logged in at backend side.
     * @returns Observable<M_User>
     */
    public getUserFromBackend = (): Observable<M_User> => {
        const user: M_User | null = this.getUserFromLocalStorage();

        if (!user) {
            return EMPTY;
        }

        return this.http.get<M_User>(API_ROUTES.checkUserSession).pipe(
            tap((response) => {
                // user is logged in -> session is valid
                this.userSubject.set(response);

                // set information in local storage
                this.storageService.setStorageItem(LOCAL_STORAGE_KEYS.KEY_USER_ID, response.id);
                this.storageService.setStorageItem(
                    LOCAL_STORAGE_KEYS.KEY_USER_NAME,
                    response.userName,
                );
                this.storageService.setStorageItem(
                    LOCAL_STORAGE_KEYS.KEY_USER_PICTURE,
                    response.image,
                );
            }),
            catchError((err) => {
                // user is not logged in -> session invalid or expired
                this.userSubject.set(null);
                return throwError(() => err);
            }),
        );
    };

    public getUser = (): Signal<M_User | null> => {
        return this.userSubject;
    };

    public loginUser = (): Observable<M_User> => {
        return this.http.post<M_User>('', {});
    };

    public logoutUser = () => {
        if (isPlatformBrowser(this.platformID)) {
            localStorage.clear();
            this.setUserToken(null);
        }
    };

    public registerUser = (): Observable<void> => {
        return this.http.post<void>('', {});
    };

    public getIsUserLoggedIn = (): Signal<boolean> => {
        return this.isLoggedIn;
    };

    public setUserToken = (token: M_User | null) => {
        this.userSubject.set(token);
    };

    public getUserFromLocalStorage = (): M_User | null => {
        if (!isPlatformBrowser(this.platformID)) {
            return null;
        }

        const image: string | null = localStorage.getItem(LOCAL_STORAGE_KEYS.KEY_USER_PICTURE);
        const userName: string | null = localStorage.getItem(LOCAL_STORAGE_KEYS.KEY_USER_NAME);
        const userID: string | null = localStorage.getItem(LOCAL_STORAGE_KEYS.KEY_USER_ID);

        return !image || !userID || !userName
            ? null
            : {
                  id: userID,
                  image,
                  userName: userName,
              };
    };
}
