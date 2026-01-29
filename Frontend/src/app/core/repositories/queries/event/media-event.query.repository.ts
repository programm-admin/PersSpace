import { InjectionToken } from '@angular/core';
import { CreateMutationResult, CreateQueryResult } from '@tanstack/angular-query-experimental';
import {
    M_MediaEvent,
    M_MediaEventListItemResponse,
    M_MediaEventResponse,
} from '../../../models/event.model';

// AT = Adapter Type; Q = query
export type AT_MediaRepository = {
    Q_createMediaEvent: CreateMutationResult<M_MediaEventResponse, unknown, M_MediaEvent>;
    Q_getMediaEvents: CreateQueryResult<M_MediaEventListItemResponse>;
};

export const IT_A_MEDIA_EVENT_REPOSITORY = new InjectionToken<AT_MediaRepository>(
    'AT_MediaRepository',
);
