import { InjectionToken } from '@angular/core';

export type T_GoogleRepository = {
  loadScript: () => void;
};

export const IT_GOOGLE_REPOSITORY = new InjectionToken<T_GoogleRepository>('T_GoogleRepository');
