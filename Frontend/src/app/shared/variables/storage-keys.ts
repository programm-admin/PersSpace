import { T_LocalStorageKeys } from '../types-and-interfaces/local-storage.type';

export const LOCAL_STORAGE_KEY_USER_TOKEN: string = 'TOKEN';
export const LOCAL_STORAGE_KEY_USER: string = 'USER';

export const LOCAL_STORAGE_KEYS: T_LocalStorageKeys = {
    KEY_USER_NAME: 'USERNAME',
    KEY_USER_PICTURE: 'PICTURE',
    KEY_REFRESH_TOKEN: 'REFRESH_TOKEN',
    KEY_ACCESS_TOKEN: 'ACCESS_TOKEN',
};

export type T_STORAGE_KEYS = keyof typeof LOCAL_STORAGE_KEYS;
