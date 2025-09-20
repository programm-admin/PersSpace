import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export type T_GoogleRepository = {
  loadScript: () => void;
  sendTokenToBackend: (token: string) => Observable<string>;
};

export const IT_GOOGLE_REPOSITORY = new InjectionToken<T_GoogleRepository>('T_GoogleRepository');
