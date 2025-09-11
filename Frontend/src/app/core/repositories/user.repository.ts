import { Observable } from 'rxjs';
import { M_User } from '../models/user.model';
import { InjectionToken } from '@angular/core';

export type T_UserRepository = {
  isUserLoggedIn: () => boolean;
  loginUser: () => Observable<M_User>;
  registerUser: () => Observable<void>;
};

export const IT_USER_REPOSITORY = new InjectionToken<T_UserRepository>('T_UserRepository');
