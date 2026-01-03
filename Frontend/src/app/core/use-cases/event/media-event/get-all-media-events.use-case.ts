import { inject, Injectable } from '@angular/core';
import { IT_MEDIA_EVENT_REPOSITORY } from '../../../repositories/events/media-event.repository';
import { Observable } from 'rxjs';
import { M_MediaEventListItemResponse } from '../../../models/event.model';

@Injectable()
export class UC_MediaEvent_GetAllMediaEvents {
    private readonly mediaEventRepository = inject(IT_MEDIA_EVENT_REPOSITORY);

    public execute = (): Observable<M_MediaEventListItemResponse> => {
        return this.mediaEventRepository.getAllMediaEvents();
    };
}
