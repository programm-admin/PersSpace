import { Provider } from '@angular/core';
import { IT_USER_REPOSITORY } from './core/repositories/user.repository';
import { UserService } from './infrastructure/services/user-service';
import { IT_STRING_REPOSITORY } from './core/repositories/string.repository';
import { StringService } from './infrastructure/services/string-service/string-service';

export const getProviders = (): Provider[] => {
  return [
    { provide: IT_USER_REPOSITORY, useClass: UserService },
    { provide: IT_STRING_REPOSITORY, useClass: StringService },
  ];
};
