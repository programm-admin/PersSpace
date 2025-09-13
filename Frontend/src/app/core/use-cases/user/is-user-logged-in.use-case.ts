import { Inject, inject, Injectable } from '@angular/core';
import { IT_USER_REPOSITORY } from '../../repositories/user.repository';

@Injectable({ providedIn: 'root' })
export class UC_User_IsUserLoggedIn {
  private readonly userRepository = inject(IT_USER_REPOSITORY);

  public execute = (): boolean => {
    return this.userRepository.isUserLoggedIn();
  };
}
