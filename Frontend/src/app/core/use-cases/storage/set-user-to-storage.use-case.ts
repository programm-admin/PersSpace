import { inject, Injectable } from '@angular/core';
import { IT_STORAGE_REPOSITORY } from '../../repositories/storage.repository';
import { M_User } from '../../models/user.model';

@Injectable()
export class UC_Storage_SetUserToStorage {
    private readonly storageRepository = inject(IT_STORAGE_REPOSITORY);

    public execute = (value: M_User, updateAccessToken: boolean): boolean => {
        return this.storageRepository.setUserToStorage(value, updateAccessToken);
    };
}
