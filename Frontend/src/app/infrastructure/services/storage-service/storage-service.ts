import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { T_StorageRepository } from '../../../core/repositories/storage.repository';
import { isPlatformBrowser } from '@angular/common';
import { M_Credentials, M_User } from '../../../core/models/user.model';
import { LOCAL_STORAGE_KEYS } from '../../../shared/variables/storage-keys';

@Injectable({
    providedIn: 'root',
})
export class StorageService implements T_StorageRepository {
    private readonly platformID = inject(PLATFORM_ID);

    getStorageItem = (key: string): string | null => {
        if (!isPlatformBrowser(this.platformID)) {
            return null;
        }

        return localStorage.getItem(key);
    };

    setStorageItem = (key: string, value: string) => {
        if (!isPlatformBrowser(this.platformID)) {
            return;
        }

        localStorage.setItem(key, value);
    };

    clearStorage = () => {
        if (!isPlatformBrowser(this.platformID)) {
            return;
        }

        localStorage.clear();
    };

    setUserToStorage = (value: M_User): boolean => {
        if (!isPlatformBrowser(this.platformID)) {
            return false;
        }

        localStorage.setItem(LOCAL_STORAGE_KEYS.KEY_USER_NAME, value.userName);
        localStorage.setItem(LOCAL_STORAGE_KEYS.KEY_USER_PICTURE, value.image);
        localStorage.setItem(LOCAL_STORAGE_KEYS.KEY_USER_ID, value.id);

        return true;
    };

    setTokensToStorage = (value: M_Credentials): boolean => {
        if (!isPlatformBrowser(this.platformID)) {
            return false;
        }

        localStorage.setItem(LOCAL_STORAGE_KEYS.KEY_ACCESS_TOKEN, value.accessToken);
        localStorage.setItem(LOCAL_STORAGE_KEYS.KEY_REFRESH_TOKEN, value.refreshToken);

        return true;
    };
}
