import { inject, Injectable } from '@angular/core';
import { IT_STORAGE_REPOSITORY } from '../../repositories/storage.repository';
import { M_Credentials } from '../../models/user.model';

@Injectable()
export class UC_Storage_SetTokensToStorage {
    private readonly storageRepository = inject(IT_STORAGE_REPOSITORY);

    public execute = (value: M_Credentials): boolean => {
        return this.storageRepository.setTokensToStorage(value);
    };
}
