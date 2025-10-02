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
import { Observable } from 'rxjs';
import { M_User } from '../../core/models/user.model';
import { HttpClient } from '@angular/common/http';
import {
    LOCAL_STORAGE_KEY_USER_TOKEN,
    LOCAL_STORAGE_KEYS,
} from '../../shared/variables/storage-keys';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root',
})
export class UserService implements T_UserRepository {
    private http = inject(HttpClient);
    private readonly platformID = inject(PLATFORM_ID);
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

    private getUserFromLocalStorage = (): M_User | null => {
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
