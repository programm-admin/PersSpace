import { InjectionToken } from '@angular/core';

export type T_StorageRepository = {
  setStorageItem: (key: string, value: string) => void;
  getStorageItem: (key: string) => string | null;
};

export const IT_STORAGE_REPOSITORY = new InjectionToken<T_StorageRepository>('T_StorageRepository');
