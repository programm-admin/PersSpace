import { Observable } from 'rxjs';
import { M_MediaEvent } from '../../models/event.model';
import { InjectionToken } from '@angular/core';

export type T_MediaEventRepository = {
    createMediaEvent: (accessToken: string, mediaEvent: M_MediaEvent) => Observable<M_MediaEvent>;
};

export const IT_MEDIA_EVENT_REPOSITORY = new InjectionToken<T_MediaEventRepository>(
    'T_MediaEventRepository',
);
