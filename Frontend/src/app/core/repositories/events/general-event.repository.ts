import { Observable } from 'rxjs';
import {
    M_GeneralEvent,
    M_GeneralEventListItemResponse,
    M_GeneralEventResponse,
    M_GeneralEventUpdateResponse,
} from '../../models/event.model';
import { InjectionToken } from '@angular/core';

export type T_GeneralEventRepository = {
    createGeneralEvent: (generalEvent: M_GeneralEvent) => Observable<M_GeneralEventResponse>;
    getAllGeneralEvents: () => Observable<M_GeneralEventListItemResponse>;
    getGeneralEvent: (id: string) => Observable<M_GeneralEventResponse>;
    updateGeneralEvent: (newEvent: M_GeneralEvent) => Observable<M_GeneralEventUpdateResponse>;
    deleteGeneralEvent: (generalEventId: string) => Observable<any>;
};

export const IT_GENERAL_EVENT_REPOSITORY = new InjectionToken<T_GeneralEventRepository>(
    'T_MediaEventRepository',
);
