import { Observable } from 'rxjs';
import { M_MediaEvent, M_MediaEventResponse } from '../../models/event.model';
import { InjectionToken } from '@angular/core';

export type T_MediaEventRepository = {
    createMediaEvent: (
        accessToken: string,
        mediaEvent: M_MediaEvent,
    ) => Observable<M_MediaEventResponse>;
};

export const IT_MEDIA_EVENT_REPOSITORY = new InjectionToken<T_MediaEventRepository>(
    'T_MediaEventRepository',
);
