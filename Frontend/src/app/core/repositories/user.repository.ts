import { Observable } from 'rxjs';
import { M_User } from '../models/user.model';
import { InjectionToken, Signal } from '@angular/core';

export type T_UserRepository = {
    isUserLoggedIn: () => boolean;
    getUserFromBackend: () => Observable<M_User>;
    getUserFromLocalStorage: () => M_User | null;
    logoutUser: () => void;
    getIsUserLoggedIn: () => Signal<boolean>;
    getUser: () => Signal<M_User | null>;
    setUser: (newUser: M_User | null) => void;
    setUserToken: (token: M_User | null) => void;
};

export const IT_USER_REPOSITORY = new InjectionToken<T_UserRepository>('T_UserRepository');
