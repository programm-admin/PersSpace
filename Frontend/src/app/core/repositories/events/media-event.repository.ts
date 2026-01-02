import { Observable } from 'rxjs';
import {
    M_MediaEvent,
    M_MediaEventListItemResponse,
    M_MediaEventResponse,
    M_MediaEventUpdateResponse,
} from '../../models/event.model';
import { InjectionToken } from '@angular/core';

export type T_MediaEventRepository = {
    createMediaEvent: (mediaEvent: M_MediaEvent) => Observable<M_MediaEventResponse>;
    getAllMediaEvents: () => Observable<M_MediaEventListItemResponse>;
    getMediaEvent: (id: string) => Observable<M_MediaEventResponse>;
    updateMediaEvent: (newEvent: M_MediaEvent) => Observable<M_MediaEventUpdateResponse>;
};

export const IT_MEDIA_EVENT_REPOSITORY = new InjectionToken<T_MediaEventRepository>(
    'T_MediaEventRepository',
);
