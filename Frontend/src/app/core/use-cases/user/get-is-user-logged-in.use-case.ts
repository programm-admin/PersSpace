import { inject, Injectable, Signal } from '@angular/core';
import { IT_USER_REPOSITORY } from '../../repositories/user.repository';

@Injectable()
export class UC_User_GetIsUserLoggedIn {
  private readonly userRepository = inject(IT_USER_REPOSITORY);

  public execute = (): Signal<boolean> => {
    return this.userRepository.getIsUserLoggedIn();
  };
}
