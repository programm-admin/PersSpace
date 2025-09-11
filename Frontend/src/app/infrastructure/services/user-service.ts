import { inject, Injectable } from '@angular/core';
import { T_UserRepository } from '../../core/repositories/user.repository';
import { Observable } from 'rxjs';
import { M_User } from '../../core/models/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService implements T_UserRepository {
  private http = inject(HttpClient);

  public isUserLoggedIn = (): boolean => {
    return true;
  };
  public loginUser = (): Observable<M_User> => {
    return this.http.post<M_User>('', {});
  };
  public registerUser = (): Observable<void> => {
    return this.http.post<void>('', {});
  };
}
