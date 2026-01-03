import { inject, Injectable } from '@angular/core';
import { IT_USER_REPOSITORY } from '../../../repositories/user.repository';
import { M_MediaEvent, M_MediaEventResponse } from '../../../models/event.model';
import { IT_MEDIA_EVENT_REPOSITORY } from '../../../repositories/events/media-event.repository';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class UC_MediaEvent_CreateMediaEvent {
    private readonly userRepository = inject(IT_USER_REPOSITORY);
    private readonly mediaRepository = inject(IT_MEDIA_EVENT_REPOSITORY);

    public execute = (mediaEvent: M_MediaEvent): Observable<M_MediaEventResponse> => {
        return this.mediaRepository.createMediaEvent(mediaEvent).pipe(
            catchError((err: HttpErrorResponse) => {
                if (err.status === 401) {
                    this.userRepository.logoutUser();
                }
                return throwError(() => err);
            }),
        );
    };
}
