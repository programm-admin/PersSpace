import { Component, computed, DestroyRef, effect, inject, OnInit, Signal } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {
    M_MediaEvent,
    M_MediaEventResponse,
    M_MediaEventUpdateResponse,
} from '../../../../core/models/event.model';
import { IT_MEDIA_EVENT_REPOSITORY } from '../../../../core/repositories/events/media-event.repository';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { APPLICATION_ROUTES } from '../../../../shared/variables/application-routes';
import { CompLoadingScreen } from '../../../layout/comp-loading-screen/comp-loading-screen';
import { CompMediaEventDisplayContent } from '../../../components/events/comp-media-event-display-content/comp-media-event-display-content';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { T_MediaEventDetailsPage_Display_Screen } from '../../../../shared/types-and-interfaces/display-screens';
import { CompEventForm } from '../../../components/events/comp-event-form/comp-event-form';
import { IT_MESSAGE_REPOSITORY } from '../../../../core/repositories/message.repository';
import { CompDeleteDialog } from '../../../layout/comp-delete-dialog/comp-delete-dialog';
import { IT_A_MEDIA_EVENT_REPOSITORY } from '../../../../core/repositories/queries/event/media-event.query.repository';
import { map } from 'rxjs';

@Component({
    selector: 'app-comp-media-event-details-page',
    imports: [
        CompLoadingScreen,
        CompMediaEventDisplayContent,
        NzButtonModule,
        NzIconModule,
        CompEventForm,
        CompDeleteDialog,
    ],
    templateUrl: './comp-media-event-details-page.html',
    styleUrl: './comp-media-event-details-page.scss',
})
export class CompMediaEventDetailsPage {
    // dependency injections
    private readonly activatedRoute = inject(ActivatedRoute);
    private readonly mediaEventAdapterRepository = inject(IT_A_MEDIA_EVENT_REPOSITORY);
    private readonly router = inject(Router);
    private readonly eventId = toSignal(
        this.activatedRoute.paramMap.pipe(map((params: ParamMap) => params.get('id'))),
        { initialValue: null },
    );

    public mediaEventQuery = computed(() => {
        const id = this.eventId();

        if (!id) return null;
        return this.mediaEventAdapterRepository.Q_getSingleMediaEvent;
    });

    public mediaEvent: Signal<M_MediaEvent | null> = computed(
        () => this.mediaEventQuery()?.data()?.mediaEvent ?? null,
    );
    public isLoading: Signal<boolean> = computed(
        () => this.mediaEventQuery()?.isLoading() ?? false,
    );
    public isError: Signal<boolean> = computed(() => this.mediaEventQuery()?.isError() ?? false);
    public displayScreen: T_MediaEventDetailsPage_Display_Screen = 'DETAILS_PAGE';

    constructor() {
        effect(() => {
            this.mediaEventAdapterRepository.setMediaEventId(this.eventId());
        });
    }

    public navigateToEventsListPage = () => {
        this.router.navigateByUrl(APPLICATION_ROUTES.mediaEvent.showAllMediaEvents.route.path!);
    };

    public setDisplayScreen = (newScreen: T_MediaEventDetailsPage_Display_Screen) =>
        (this.displayScreen = newScreen);

    public submitForm = (newEvent: M_MediaEvent) => {
        if (!this.eventId()) return;

        this.mediaEventAdapterRepository.Q_updateMediaEvent.mutate(newEvent);
    };

    public cancelForm = () => {
        this.setDisplayScreen('DETAILS_PAGE');
    };

    public deleteEvent = () => {
        // if (!this.mediaEvent) return;
        // this.mediaEventRepository.deleteMediaEvent(this.mediaEvent.id).subscribe({
        //     next: () => {
        //         this.messageRepository.showMessage(
        //             'success',
        //             `"${this.mediaEvent?.title}" wurde erfolgreich gelöscht.`,
        //         );
        //         this.router.navigateByUrl(
        //             APPLICATION_ROUTES.mediaEvent.showAllMediaEvents.route.path!,
        //         );
        //     },
        //     error: () =>
        //         this.messageRepository.showMessage(
        //             'error',
        //             `Fehler beim Löschen von "${this.mediaEvent?.title}".`,
        //         ),
        // });
    };
}
