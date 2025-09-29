import { inject, Injectable } from '@angular/core';
import { IT_STORAGE_REPOSITORY } from '../../repositories/storage.repository';
import { T_STORAGE_KEYS } from '../../../shared/variables/storage-keys';

@Injectable()
export class UC_Storage_SetItem {
    private readonly storageRepository = inject(IT_STORAGE_REPOSITORY);

    public execute = (key: T_STORAGE_KEYS, value: string) => {
        return this.storageRepository.setStorageItem(key, value);
    };
}
