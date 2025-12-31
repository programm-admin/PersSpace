import { Component, DestroyRef, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { UC_MediaEvent_GetAllMediaEvents } from '../../../../core/use-cases/event/media-event/get-all-media-events.use-case';
import {
    M_MediaEventListItem,
    M_MediaEventListItemResponse,
} from '../../../../core/models/event.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CompLoadingScreen } from '../../../layout/comp-loading-screen/comp-loading-screen';

@Component({
    selector: 'app-comp-media-event-list-page',
    imports: [NzCardModule, CompLoadingScreen],
    templateUrl: './comp-media-event-list-page.html',
    styleUrl: './comp-media-event-list-page.scss',
    providers: [UC_MediaEvent_GetAllMediaEvents],
})
export class CompMediaEventListPage implements OnInit {
    private readonly UC_GetAllMediaEvents = inject(UC_MediaEvent_GetAllMediaEvents);

    public userMediaEvents: WritableSignal<M_MediaEventListItem[] | null> = signal(null);
    public destroyReference = inject(DestroyRef);
    public isLoading: boolean = false;
    public isError: boolean = false;

    ngOnInit(): void {
        this.getAllMediaEvents();
    }

    public getAllMediaEvents = () => {
        this.isLoading = true;
        this.UC_GetAllMediaEvents.execute()
            .pipe(takeUntilDestroyed(this.destroyReference))
            .subscribe({
                next: (resMediaEvents: M_MediaEventListItemResponse) => {
                    this.userMediaEvents.set(resMediaEvents.mediaEvents);
                    this.isLoading = false;
                },
                error: (err: any) => {
                    console.log('error', err);
                    this.isError = true;
                    this.isLoading = false;
                },
            });
    };
}
