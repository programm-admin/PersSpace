import { Provider } from '@angular/core';
import { IT_USER_REPOSITORY } from './core/repositories/user.repository';
import { UserService } from './infrastructure/services/user-service';
import { IT_STRING_REPOSITORY } from './core/repositories/string.repository';
import { StringService } from './infrastructure/services/string-service/string-service';
import { IT_STORAGE_REPOSITORY } from './core/repositories/storage.repository';
import { StorageService } from './infrastructure/services/storage-service/storage-service';
import { IT_GOOGLE_REPOSITORY } from './core/repositories/google.repository';
import { GoogleAuthService } from './infrastructure/services/google-service/google-service';

export const getProviders = (): Provider[] => {
  return [
    { provide: IT_USER_REPOSITORY, useClass: UserService },
    { provide: IT_STRING_REPOSITORY, useClass: StringService },
    { provide: IT_STORAGE_REPOSITORY, useClass: StorageService },
    { provide: IT_GOOGLE_REPOSITORY, useClass: GoogleAuthService },
  ];
};
