import { Component, inject } from '@angular/core';
import { CompEventForm } from '../../components/events/comp-event-form/comp-event-form';
import { Router } from '@angular/router';
import { APPLICATION_ROUTES } from '../../../shared/variables/application-routes';
import { M_GeneralEvent } from '../../../core/models/event.model';
import { UC_MediaEvent_CreateMediaEvent } from '../../../core/use-cases/event/general-event/create-general-event.use-case';
import { UC_Message_ShowMessage } from '../../../core/use-cases/message/show-message.use-case';
import { CompAuthWrapper } from '../../layout/comp-auth-wrapper/comp-auth-wrapper';
import { IT_A_GENERAL_EVENT_REPOSITORY } from '../../../core/repositories/queries/event/general-event.query.repository';

@Component({
    selector: 'app-comp-create-event-page',
    imports: [CompEventForm, CompAuthWrapper],
    templateUrl: './comp-create-general-event-page.html',
    styleUrl: './comp-create-general-event-page.scss',
    providers: [UC_MediaEvent_CreateMediaEvent, UC_Message_ShowMessage],
})
export class CompCreateGeneralEventPage {
    // dependency injections
    public router = inject(Router);
    private readonly generalEventAdapterRepository = inject(IT_A_GENERAL_EVENT_REPOSITORY);

    public cancelSubmitForm = () => {
        // navigate to start page
        this.router.navigateByUrl(APPLICATION_ROUTES.start.route.path!);
    };

    public submitForm = (object: M_GeneralEvent) => {
        this.generalEventAdapterRepository.Q_createGeneralEvent?.mutate(object);
    };
}
