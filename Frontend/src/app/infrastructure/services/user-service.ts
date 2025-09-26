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
import { LOCAL_STORAGE_KEY_USER_TOKEN } from '../../shared/variables/storage-keys';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root',
})
export class UserService implements T_UserRepository {
    private http = inject(HttpClient);
    private readonly platformID = inject(PLATFORM_ID);
    private userToken: WritableSignal<string | null> = signal<string | null>(
        isPlatformBrowser(this.platformID)
            ? localStorage.getItem(LOCAL_STORAGE_KEY_USER_TOKEN)
            : null,
    );
    private readonly isLoggedIn: Signal<boolean> = computed(() => this.userToken() !== null);

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

    public setUserToken = (token: string | null) => {
        this.userToken.set(token);
    };
}
