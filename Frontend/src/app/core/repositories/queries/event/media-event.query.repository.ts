import { InjectionToken } from '@angular/core';
import { CreateMutationResult, CreateQueryResult } from '@tanstack/angular-query-experimental';
import {
    M_MediaEvent,
    M_MediaEventListItemResponse,
    M_MediaEventResponse,
    M_MediaEventUpdateResponse,
} from '../../../models/event.model';

// AT = Adapter Type; Q = query
export type AT_MediaRepository = {
    setMediaEventId: (id: string | null) => void;

    Q_createMediaEvent:
        | CreateMutationResult<M_MediaEventResponse, unknown, M_MediaEvent>
        | undefined;
    Q_updateMediaEvent:
        | CreateMutationResult<M_MediaEventUpdateResponse, unknown, M_MediaEvent>
        | undefined;
    Q_deleteMediaEvent: CreateMutationResult<any, unknown, string> | undefined;
    Q_getMediaEvents: CreateQueryResult<M_MediaEventListItemResponse> | undefined;
    Q_getSingleMediaEvent: CreateQueryResult<M_MediaEventResponse> | undefined;
};

export const IT_A_MEDIA_EVENT_REPOSITORY = new InjectionToken<AT_MediaRepository>(
    'AT_MediaRepository',
);
