import { Component, inject } from '@angular/core';
import { CompEventForm } from '../../components/events/comp-event-form/comp-event-form';
import { Router } from '@angular/router';
import { APPLICATION_ROUTES } from '../../../shared/variables/application-routes';
import { M_MediaEvent } from '../../../core/models/event.model';
import { UC_MediaEvent_CreateMediaEvent } from '../../../core/use-cases/event/media-event/create-media-event.use-case';
import { UC_Message_ShowMessage } from '../../../core/use-cases/message/show-message.use-case';
import { CompAuthWrapper } from '../../layout/comp-auth-wrapper/comp-auth-wrapper';
import { IT_A_MEDIA_EVENT_REPOSITORY } from '../../../core/repositories/queries/event/media-event.query.repository';

@Component({
    selector: 'app-comp-create-event-page',
    imports: [CompEventForm, CompAuthWrapper],
    templateUrl: './comp-create-media-event-page.html',
    styleUrl: './comp-create-media-event-page.scss',
    providers: [UC_MediaEvent_CreateMediaEvent, UC_Message_ShowMessage],
})
export class CompCreateMediaEventPage {
    // dependency injections
    public router = inject(Router);
    private readonly mediaEventAdapterRepository = inject(IT_A_MEDIA_EVENT_REPOSITORY);

    public cancelSubmitForm = () => {
        // navigate to start page
        this.router.navigateByUrl(APPLICATION_ROUTES.start.route.path!);
    };

    public submitForm = (object: M_MediaEvent) => {
        this.mediaEventAdapterRepository.Q_createMediaEvent.mutate(object);
    };
}
