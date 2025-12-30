import { Component, DestroyRef, inject } from '@angular/core';
import { CompEventForm } from '../../components/events/comp-event-form/comp-event-form';
import { Router } from '@angular/router';
import { APPLICATION_ROUTES } from '../../../shared/variables/application-routes';
import { M_MediaEvent, M_MediaEventResponse } from '../../../core/models/event.model';
import { UC_MediaEvent_CreateMediaEvent } from '../../../core/use-cases/event/media-event/create-media-event.use-case';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UC_Message_ShowMessage } from '../../../core/use-cases/message/show-message.use-case';

@Component({
    selector: 'app-comp-create-event-page',
    imports: [CompEventForm],
    templateUrl: './comp-create-media-event-page.html',
    styleUrl: './comp-create-media-event-page.scss',
    providers: [UC_MediaEvent_CreateMediaEvent, UC_Message_ShowMessage],
})
export class CompCreateMediaEventPage {
    // dependency injections
    public router = inject(Router);
    private readonly UC_CreateMediaEvent = inject(UC_MediaEvent_CreateMediaEvent);
    private readonly UC_ShowMessage = inject(UC_Message_ShowMessage);
    private readonly destroyReference = inject(DestroyRef);

    public cancelSubmitForm = () => {
        // navigate to start page
        this.router.navigateByUrl(APPLICATION_ROUTES.start.route.path!);
    };

    public submitForm = (object: M_MediaEvent) => {
        console.log('object: ', object);
        this.UC_CreateMediaEvent.execute(object)
            .pipe(takeUntilDestroyed(this.destroyReference))
            .subscribe({
                next: (val: M_MediaEventResponse) => {
                    this.UC_ShowMessage.execute(
                        'success',
                        `Medienevent '${val.mediaEvent.title}' erfolgreich angelegt.`,
                    );
                },
                error: (err: any) => {
                    this.UC_ShowMessage.execute(
                        'error',
                        `Beim Anlegen von '${object.title}' ist ein Fehler aufgetreten.`,
                    );
                },
            });
    };
}
