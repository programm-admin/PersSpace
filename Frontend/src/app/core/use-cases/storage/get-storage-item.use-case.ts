import { inject, Injectable } from '@angular/core';
import { IT_STORAGE_REPOSITORY } from '../../repositories/storage.repository';

@Injectable()
export class UC_Storage_GetStorageItem {
    private readonly storageRepository = inject(IT_STORAGE_REPOSITORY);

    public execute = (key: string): string | null => {
        return this.storageRepository.getStorageItem(key);
    };
}
