import { inject, Injectable } from '@angular/core';
import { IT_GENERAL_EVENT_REPOSITORY } from '../../../repositories/events/general-event.repository';
import { Observable } from 'rxjs';
import { M_GeneralEventListItemResponse } from '../../../models/event.model';

@Injectable()
export class UC_GeneralEvent_GetAllMediaEvents {
    private readonly generalEventRepository = inject(IT_GENERAL_EVENT_REPOSITORY);

    public execute = (): Observable<M_GeneralEventListItemResponse> => {
        return this.generalEventRepository.getAllGeneralEvents();
    };
}
