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
import { EMPTY, Observable } from 'rxjs';
import { M_User } from '../../core/models/user.model';
import { HttpClient } from '@angular/common/http';
import { LOCAL_STORAGE_KEYS } from '../../shared/variables/storage-keys';
import { isPlatformBrowser } from '@angular/common';
import { API_ROUTES } from '../../environment/api-routes';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class UserService implements T_UserRepository {
    // dependency injections
    private readonly http = inject(HttpClient);
    private readonly router = inject(Router);
    private readonly platformID = inject(PLATFORM_ID);

    private userSubject: WritableSignal<M_User | null> = signal<M_User | null>(
        (() => {
            if (!isPlatformBrowser(this.platformID)) return null;

            const image: string | null = localStorage.getItem(LOCAL_STORAGE_KEYS.KEY_USER_PICTURE);
            const userName: string | null = localStorage.getItem(LOCAL_STORAGE_KEYS.KEY_USER_NAME);
            const userID: string | null = localStorage.getItem(LOCAL_STORAGE_KEYS.KEY_USER_ID);
            const email: string | null = localStorage.getItem(LOCAL_STORAGE_KEYS.KEY_USER_EMAIL);

            return !image ||
                !userID ||
                !userName ||
                !email ||
                (image && !image.trim()) ||
                (userID && !userID.trim()) ||
                (userName && !userName.trim()) ||
                (email && !email.trim())
                ? null
                : {
                      userID: userID,
                      picture: image,
                      userName: userName,
                      email,
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
        if (!isPlatformBrowser(this.platformID)) return EMPTY;

        return this.http.get<M_User>(API_ROUTES.checkUserSession, {
            withCredentials: true, // send cookie automatically
        });
    };

    /**
     * Function for getting current login status of user via user signal.
     * @returns Signal<M_User | null>
     */
    public getUser = (): Signal<M_User | null> => {
        return this.userSubject;
    };

    /**
     * Function for setting login status (user signal) for user.
     * @param newUser M_User | null
     */
    public setUser = (newUser: M_User | null) => {
        this.userSubject.set(newUser);
    };

    public logoutUser = (): Observable<any> => {
        if (isPlatformBrowser(this.platformID)) {
            localStorage.clear();
            this.setUserToken(null);
        }

        return this.http.get(API_ROUTES.user.logout, { withCredentials: true });
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
        const email: string | null = localStorage.getItem(LOCAL_STORAGE_KEYS.KEY_USER_EMAIL);

        return !image ||
            !userID ||
            !userName ||
            !email ||
            (image && !image.trim()) ||
            (userID && !userID.trim()) ||
            (userName && !userName.trim()) ||
            (email && !email.trim())
            ? null
            : {
                  userID,
                  picture: image,
                  userName,
                  email,
              };
    };
}
