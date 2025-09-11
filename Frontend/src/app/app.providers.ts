import { Provider } from '@angular/core';
import { IT_USER_REPOSITORY } from './core/repositories/user.repository';
import { UserService } from './infrastructure/services/user-service';

export const getProviders = (): Provider[] => {
  return [{ provide: IT_USER_REPOSITORY, useClass: UserService }];
};
