import { inject, Injectable } from '@angular/core';
import { T_MediaEventRepository } from '../../../../core/repositories/events/media-event.repository';
import { EMPTY, Observable } from 'rxjs';
import { M_MediaEvent } from '../../../../core/models/event.model';
import { HttpClient } from '@angular/common/http';
import { API_ROUTES } from '../../../../environment/api-routes';

@Injectable({
    providedIn: 'root',
})
export class MediaEventService implements T_MediaEventRepository {
    private readonly http = inject(HttpClient);

    public createMediaEvent = (
        accessToken: string,
        mediaEvent: M_MediaEvent,
    ): Observable<M_MediaEvent> => {
        if (!accessToken) return EMPTY;

        return this.http.post<M_MediaEvent>(API_ROUTES.mediaEvent.create, mediaEvent, {
            headers: {
                access_token: accessToken,
            },
            withCredentials: true,
        });
    };
}
