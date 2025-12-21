import { Component, inject } from '@angular/core';
import { CompEventForm } from '../../components/events/comp-event-form/comp-event-form';
import { Router } from '@angular/router';
import { APPLICATION_ROUTES } from '../../../shared/variables/application-routes';
import { M_MediaEvent } from '../../../core/models/event.model';

@Component({
    selector: 'app-comp-create-event-page',
    imports: [CompEventForm],
    templateUrl: './comp-create-event-page.html',
    styleUrl: './comp-create-event-page.scss',
})
export class CompCreateEventPage {
    public router = inject(Router);

    public cancelSubmitForm = () => {
        // navigate to start page
        this.router.navigateByUrl(APPLICATION_ROUTES.start.route.path!);
    };

    public submitForm = (object: M_MediaEvent) => {
        console.log('object: ', object);
    };
}
