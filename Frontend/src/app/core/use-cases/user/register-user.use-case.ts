import { inject, Injectable } from '@angular/core';
import { IT_USER_REPOSITORY } from '../../repositories/user.repository';

@Injectable()
export class UC_User_RegisterUser {
  private readonly userRepository = inject(IT_USER_REPOSITORY);

  public execute = () => {
    return this.userRepository.registerUser();
  };
}
