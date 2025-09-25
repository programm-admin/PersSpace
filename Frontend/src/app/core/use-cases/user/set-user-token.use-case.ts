import { inject, Injectable } from '@angular/core';
import { IT_USER_REPOSITORY } from '../../repositories/user.repository';

@Injectable()
export class UC_User_SetUserToken {
  private readonly userRepository = inject(IT_USER_REPOSITORY);

  public execute = (token: string | null) => {
    return this.userRepository.setUserToken(token);
  };
}
