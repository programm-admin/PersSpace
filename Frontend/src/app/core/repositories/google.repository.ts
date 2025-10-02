import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { M_UserLoginResponse } from '../models/user.model';

export type T_GoogleRepository = {
    loadScript: () => void;
    sendTokenToBackend: (token: string) => Observable<M_UserLoginResponse>;
};

export const IT_GOOGLE_REPOSITORY = new InjectionToken<T_GoogleRepository>('T_GoogleRepository');
