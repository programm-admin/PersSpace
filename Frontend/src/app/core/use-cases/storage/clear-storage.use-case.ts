import { inject, Injectable } from '@angular/core';
import { IT_STORAGE_REPOSITORY } from '../../repositories/storage.repository';

@Injectable()
export class UC_Storage_ClearStorage {
    private readonly storageRepository = inject(IT_STORAGE_REPOSITORY);

    public execute = () => {
        return this.storageRepository.clearStorage();
    };
}
