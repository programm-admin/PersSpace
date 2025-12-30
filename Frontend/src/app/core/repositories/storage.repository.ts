import { InjectionToken } from '@angular/core';
import { M_User } from '../models/user.model';
import { T_STORAGE_KEYS } from '../../shared/variables/storage-keys';

export type T_StorageRepository = {
    setStorageItem: (key: T_STORAGE_KEYS, value: string) => void;
    setUserToStorage: (value: M_User, updateAccessToken: boolean) => boolean;
    getStorageItem: (key: string) => string | null;
    clearStorage: () => void;
};

export const IT_STORAGE_REPOSITORY = new InjectionToken<T_StorageRepository>('T_StorageRepository');
