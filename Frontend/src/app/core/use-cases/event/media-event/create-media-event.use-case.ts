import { inject, Injectable } from '@angular/core';
import { IT_USER_REPOSITORY } from '../../../repositories/user.repository';
import { M_MediaEvent } from '../../../models/event.model';
import { IT_MEDIA_EVENT_REPOSITORY } from '../../../repositories/events/media-event.repository';
import { M_User } from '../../../models/user.model';
import { EMPTY } from 'rxjs';

@Injectable()
export class UC_MediaEvent_CreateMediaEvent {
    private readonly userRepository = inject(IT_USER_REPOSITORY);
    private readonly mediaRepository = inject(IT_MEDIA_EVENT_REPOSITORY);

    public execute = (mediaEvent: M_MediaEvent) => {
        const user: M_User | null = this.userRepository.getUser()();

        if (!user) return EMPTY;

        return this.mediaRepository.createMediaEvent(user.accessToken, mediaEvent);
    };
}
