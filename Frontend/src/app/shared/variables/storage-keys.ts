import { T_LocalStorageKeys } from '../types-and-interfaces/local-storage.type';

export const LOCAL_STORAGE_KEY_USER_TOKEN: string = 'TOKEN';
export const LOCAL_STORAGE_KEY_USER: string = 'USER';

export const LOCAL_STORAGE_KEYS: T_LocalStorageKeys = {
    KEY_USER_NAME: 'USERNAME',
    KEY_USER_ID: 'USER_ID',
    KEY_USER_PICTURE: 'PICTURE',
    KEY_USER_EMAIL: 'EMAIL',
};

export type T_STORAGE_KEYS = keyof typeof LOCAL_STORAGE_KEYS;
