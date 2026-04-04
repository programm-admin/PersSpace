import { Component, computed, effect, inject, Signal } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { M_GeneralEvent } from '../../../../core/models/event.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { APPLICATION_ROUTES } from '../../../../shared/variables/application-routes';
import { CompLoadingScreen } from '../../../layout/comp-loading-screen/comp-loading-screen';
import { CompGeneralEventDisplayContent } from '../../../components/events/comp-general-event-display-content/comp-general-event-display-content';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { T_MediaEventDetailsPage_Display_Screen } from '../../../../shared/types-and-interfaces/display-screens';
import { CompEventForm } from '../../../components/events/comp-event-form/comp-event-form';
import { CompDeleteDialog } from '../../../layout/comp-delete-dialog/comp-delete-dialog';
import { IT_A_GENERAL_EVENT_REPOSITORY } from '../../../../core/repositories/queries/event/general-event.query.repository';
import { map } from 'rxjs';

@Component({
    selector: 'app-comp-general-event-details-page',
    imports: [
        CompLoadingScreen,
        CompGeneralEventDisplayContent,
        NzButtonModule,
        NzIconModule,
        CompEventForm,
        CompDeleteDialog,
    ],
    templateUrl: './comp-general-event-details-page.html',
    styleUrl: './comp-general-event-details-page.scss',
})
export class CompGeneralEventDetailsPage {
    // dependency injections
    private readonly activatedRoute = inject(ActivatedRoute);
    private readonly generalEventAdapterRepository = inject(IT_A_GENERAL_EVENT_REPOSITORY);
    private readonly router = inject(Router);
    private readonly eventId = toSignal(
        this.activatedRoute.paramMap.pipe(map((params: ParamMap) => params.get('id'))),
        { initialValue: null },
    );

    public generalEventQuery = computed(() => {
        const id = this.eventId();

        if (!id) return null;
        return this.generalEventAdapterRepository.Q_getSingleGeneralEvent;
    });

    public generalEvent: Signal<M_GeneralEvent | null> = computed(
        () => this.generalEventQuery()?.data()?.generalEvent ?? null,
    );
    public isLoading: Signal<boolean> = computed(
        () => this.generalEventQuery()?.isLoading() ?? false,
    );
    public isError: Signal<boolean> = computed(() => this.generalEventQuery()?.isError() ?? false);
    public displayScreen: T_MediaEventDetailsPage_Display_Screen = 'DETAILS_PAGE';

    constructor() {
        effect(() => {
            this.generalEventAdapterRepository.setMediaEventId(this.eventId());
        });
    }

    public navigateToEventsListPage = () => {
        this.router.navigateByUrl(APPLICATION_ROUTES.generalEvent.showAllGeneralEvents.route.path!);
    };

    public setDisplayScreen = (newScreen: T_MediaEventDetailsPage_Display_Screen) =>
        (this.displayScreen = newScreen);

    public submitForm = (newEvent: M_GeneralEvent) => {
        if (!this.eventId()) return;

        this.generalEventAdapterRepository.Q_updateGeneralEvent?.mutate(newEvent);
        this.setDisplayScreen('DETAILS_PAGE');
    };

    public cancelForm = () => {
        this.setDisplayScreen('DETAILS_PAGE');
    };

    public deleteEvent = () => {
        if (!this.generalEvent()) return;

        this.generalEventAdapterRepository.Q_deleteGeneralEvent?.mutate(this.eventId()!);
    };
}
