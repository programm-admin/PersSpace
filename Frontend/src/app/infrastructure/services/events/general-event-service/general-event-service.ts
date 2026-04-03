import { inject, Injectable } from '@angular/core';
import { T_GeneralEventRepository as T_GeneralEventRepository } from '../../../../core/repositories/events/general-event.repository';
import { Observable, take } from 'rxjs';
import {
    M_GeneralEvent as M_GeneralEvent,
    M_GeneralEventListItemResponse as M_GeneralEventListItemResponse,
    M_GeneralEventResponse as M_GeneralEventResponse,
    M_GeneralEventUpdateResponse,
} from '../../../../core/models/event.model';
import { HttpClient } from '@angular/common/http';
import { API_ROUTES } from '../../../../environment/api-routes';

@Injectable({
    providedIn: 'root',
})
export class GeneralEventService implements T_GeneralEventRepository {
    private readonly http = inject(HttpClient);

    public createGeneralEvent = (generalEvent: M_GeneralEvent): Observable<M_GeneralEventResponse> => {
        return this.http.post<M_GeneralEventResponse>(API_ROUTES.generalEvent.create, generalEvent, {
            withCredentials: true,
        });
    };

    public getAllGeneralEvents = (): Observable<M_GeneralEventListItemResponse> => {
        return this.http.get<M_GeneralEventListItemResponse>(API_ROUTES.generalEvent.getAll, {
            withCredentials: true,
        });
    };

    public getGeneralEvent = (id: string): Observable<M_GeneralEventResponse> => {
        return this.http
            .get<M_GeneralEventResponse>(API_ROUTES.generalEvent.getGeneralEvent + id, {
                withCredentials: true,
            })
            .pipe(take(1));
    };

    public updateGeneralEvent = (newEvent: M_GeneralEvent): Observable<M_GeneralEventUpdateResponse> => {
        return this.http.patch<M_GeneralEventUpdateResponse>(
            API_ROUTES.generalEvent.updateGeneralEvent,
            { ...newEvent },
            { withCredentials: true },
        );
    };

    public deleteGeneralEvent = (mediaEventId: string) => {
        return this.http.delete(API_ROUTES.generalEvent.deleteGeneralEvent, {
            body: { mediaID: mediaEventId },
            withCredentials: true,
        });
    };
}
