import { InjectionToken, Signal } from '@angular/core';

export type T_LoadingRepository = {
    showLoading: () => void;
    hideLoading: () => void;
    getLoading: () => Signal<boolean>;
};

export const IT_LOADING_REPOSITORY = new InjectionToken<T_LoadingRepository>('T_LoadingRepository');
