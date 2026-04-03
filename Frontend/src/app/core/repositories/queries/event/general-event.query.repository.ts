import { InjectionToken } from '@angular/core';
import { CreateMutationResult, CreateQueryResult } from '@tanstack/angular-query-experimental';
import {
    M_GeneralEvent,
    M_GeneralEventListItemResponse,
    M_GeneralEventResponse,
    M_GeneralEventUpdateResponse,
} from '../../../models/event.model';

// AT = Adapter Type; Q = query
export type AT_GeneralEventRepository = {
    setMediaEventId: (id: string | null) => void;

    Q_createGeneralEvent:
        | CreateMutationResult<M_GeneralEventResponse, unknown, M_GeneralEvent>
        | undefined;
    Q_updateGeneralEvent:
        | CreateMutationResult<M_GeneralEventUpdateResponse, unknown, M_GeneralEvent>
        | undefined;
    Q_deleteGeneralEvent: CreateMutationResult<any, unknown, string> | undefined;
    Q_getGeneralEvents: CreateQueryResult<M_GeneralEventListItemResponse> | undefined;
    Q_getSingleGeneralEvent: CreateQueryResult<M_GeneralEventResponse> | undefined;
};

export const IT_A_GENERAL_EVENT_REPOSITORY = new InjectionToken<AT_GeneralEventRepository>(
    'AT_GeneralEventRepository',
);
