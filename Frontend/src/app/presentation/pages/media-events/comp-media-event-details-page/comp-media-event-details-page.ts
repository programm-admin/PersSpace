import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {
    M_MediaEvent,
    M_MediaEventResponse,
    M_MediaEventUpdateResponse,
} from '../../../../core/models/event.model';
import { IT_MEDIA_EVENT_REPOSITORY } from '../../../../core/repositories/events/media-event.repository';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { APPLICATION_ROUTES } from '../../../../shared/variables/application-routes';
import { CompLoadingScreen } from '../../../layout/comp-loading-screen/comp-loading-screen';
import { CompMediaEventDisplayContent } from '../../../components/events/comp-media-event-display-content/comp-media-event-display-content';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { T_MediaEventDetailsPage_Display_Screen } from '../../../../shared/types-and-interfaces/display-screens';
import { CompEventForm } from '../../../components/events/comp-event-form/comp-event-form';
import { IT_MESSAGE_REPOSITORY } from '../../../../core/repositories/message.repository';
import { CompDeleteDialog } from '../../../layout/comp-delete-dialog/comp-delete-dialog';

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
export class CompMediaEventDetailsPage implements OnInit {
    // dependency injections
    private readonly activatedRoute = inject(ActivatedRoute);
    private readonly mediaEventRepository = inject(IT_MEDIA_EVENT_REPOSITORY);
    private readonly messageRepository = inject(IT_MESSAGE_REPOSITORY);
    private readonly destroyRef = inject(DestroyRef);
    private readonly router = inject(Router);

    public mediaEvent: M_MediaEvent | null = null;
    public isLoading: boolean = false;
    public isError: boolean = false;
    public displayScreen: T_MediaEventDetailsPage_Display_Screen = 'DETAILS_PAGE';
    public eventID: string | null = null;

    ngOnInit(): void {
        this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
            const id: string | null = params.get('id');
            this.eventID = id;

            if (!id) {
                this.router.navigateByUrl(APPLICATION_ROUTES.start.route.path!);
                return;
            }

            this.loadMediaEvent(id);
        });
    }

    private loadMediaEvent = (id: string) => {
        this.isLoading = true;
        this.mediaEventRepository
            .getMediaEvent(id)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: (res: M_MediaEventResponse) => {
                    this.mediaEvent = res.mediaEvent;
                    this.isLoading = false;
                },
                error: () => {
                    this.isLoading = false;
                    this.isError = true;
                },
            });
    };

    public navigateToEventsListPage = () => {
        this.router.navigateByUrl(APPLICATION_ROUTES.mediaEvent.showAllMediaEvents.route.path!);
    };

    public setDisplayScreen = (newScreen: T_MediaEventDetailsPage_Display_Screen) =>
        (this.displayScreen = newScreen);

    public submitForm = (newEvent: M_MediaEvent) => {
        if (!this.eventID) return;

        this.mediaEventRepository.updateMediaEvent(newEvent).subscribe({
            next: (res: M_MediaEventUpdateResponse) => {
                this.messageRepository.showMessage(
                    'success',
                    `"${res.mediaEvent.title}" erfolgreich überschrieben.`,
                );
                this.setDisplayScreen('DETAILS_PAGE');

                this.loadMediaEvent(this.eventID!);
            },
            error: () =>
                this.messageRepository.showMessage(
                    'error',
                    `Fehler beim Update von "${newEvent.title}"`,
                ),
        });
    };

    public cancelForm = () => {
        this.setDisplayScreen('DETAILS_PAGE');
    };

    public deleteEvent = () => {
        if (!this.mediaEvent) return;

        this.mediaEventRepository.deleteMediaEvent(this.mediaEvent.id).subscribe({
            next: () => {
                this.messageRepository.showMessage(
                    'success',
                    `"${this.mediaEvent?.title}" wurde erfolgreich gelöscht.`,
                );
                this.router.navigateByUrl(
                    APPLICATION_ROUTES.mediaEvent.showAllMediaEvents.route.path!,
                );
            },
            error: () =>
                this.messageRepository.showMessage(
                    'error',
                    `Fehler beim Löschen von "${this.mediaEvent?.title}".`,
                ),
        });
    };
}
