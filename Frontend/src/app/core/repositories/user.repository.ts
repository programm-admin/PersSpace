import { Observable } from 'rxjs';
import { M_User } from '../models/user.model';
import { InjectionToken, Signal } from '@angular/core';

export type T_UserRepository = {
    isUserLoggedIn: () => boolean;
    loginUser: () => Observable<M_User>;
    logoutUser: () => void;
    registerUser: () => Observable<void>;
    getIsUserLoggedIn: () => Signal<boolean>;
    getUser: () => Signal<M_User | null>;
    setUserToken: (token: M_User | null) => void;
};

export const IT_USER_REPOSITORY = new InjectionToken<T_UserRepository>('T_UserRepository');
