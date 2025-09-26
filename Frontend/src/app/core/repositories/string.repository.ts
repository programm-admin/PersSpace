import { InjectionToken } from '@angular/core';
import { T_ApplicationRoute } from '../../shared/types-and-interfaces/application-route';

export type T_StringRepository = {
    getPathFromRoute: (route: T_ApplicationRoute) => string;
};

export const IT_STRING_REPOSITORY = new InjectionToken<T_StringRepository>('T_StringRepository');
