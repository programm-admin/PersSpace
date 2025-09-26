import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { T_StorageRepository } from '../../../core/repositories/storage.repository';
import { isPlatformBrowser } from '@angular/common';

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
}
