import { inject, Injectable } from '@angular/core';
import { IT_USER_REPOSITORY } from '../../../repositories/user.repository';
import { IT_MEDIA_EVENT_REPOSITORY } from '../../../repositories/events/media-event.repository';
import { EMPTY, Observable } from 'rxjs';
import { M_MediaEventListItemResponse } from '../../../models/event.model';
import { M_User } from '../../../models/user.model';

@Injectable()
export class UC_MediaEvent_GetAllMediaEvents {
    private readonly userRepository = inject(IT_USER_REPOSITORY);
    private readonly mediaEventRepository = inject(IT_MEDIA_EVENT_REPOSITORY);

    public execute = (): Observable<M_MediaEventListItemResponse> => {
        const user: M_User | null = this.userRepository.getUser()();

        if (!user) return EMPTY;

        return this.mediaEventRepository.getAllMediaEvents(user.accessToken);
    };
}
