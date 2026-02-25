import { inject, Injectable } from '@angular/core';
import { T_MediaEventRepository } from '../../../../core/repositories/events/media-event.repository';
import { Observable, take, tap } from 'rxjs';
import {
    M_MediaEvent,
    M_MediaEventListItemResponse,
    M_MediaEventResponse,
    M_MediaEventUpdateResponse,
} from '../../../../core/models/event.model';
import { HttpClient } from '@angular/common/http';
import { API_ROUTES } from '../../../../environment/api-routes';

@Injectable({
    providedIn: 'root',
})
export class MediaEventService implements T_MediaEventRepository {
    private readonly http = inject(HttpClient);

    public createMediaEvent = (mediaEvent: M_MediaEvent): Observable<M_MediaEventResponse> => {
        return this.http.post<M_MediaEventResponse>(API_ROUTES.mediaEvent.create, mediaEvent, {
            withCredentials: true,
        });
    };

    public getAllMediaEvents = (): Observable<M_MediaEventListItemResponse> => {
        return this.http.get<M_MediaEventListItemResponse>(API_ROUTES.mediaEvent.getAll, {
            withCredentials: true,
        });
    };

    public getMediaEvent = (id: string): Observable<M_MediaEventResponse> => {
        return this.http
            .get<M_MediaEventResponse>(API_ROUTES.mediaEvent.getMediaEvent + id, {
                withCredentials: true,
            })
            .pipe(take(1));
    };

    public updateMediaEvent = (newEvent: M_MediaEvent): Observable<M_MediaEventUpdateResponse> => {
        return this.http.patch<M_MediaEventUpdateResponse>(
            API_ROUTES.mediaEvent.updateMediaEvent,
            { ...newEvent },
            { withCredentials: true },
        );
    };

    public deleteMediaEvent = (mediaEventId: string) => {
        return this.http.delete(API_ROUTES.mediaEvent.deleteMediaEvent, {
            body: { mediaID: mediaEventId },
            withCredentials: true,
        });
    };
}
