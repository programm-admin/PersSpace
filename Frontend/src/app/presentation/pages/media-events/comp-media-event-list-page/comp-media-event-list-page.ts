import { Component, DestroyRef, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { UC_MediaEvent_GetAllMediaEvents } from '../../../../core/use-cases/event/media-event/get-all-media-events.use-case';
import {
    M_MediaEventListItem,
    M_MediaEventListItemResponse,
} from '../../../../core/models/event.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { LIST_SORTINGS } from '../../../../shared/variables/list-sorting';
import { T_ListSortingItem } from '../../../../shared/types-and-interfaces/list-sorting.type';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NonNullableFormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { convertSortingFilterToGerman } from '../../../../shared/functions/convert-sorting-filter-to-german';
import { IT_MESSAGE_REPOSITORY } from '../../../../core/repositories/message.repository';
import { Router } from '@angular/router';
import { APPLICATION_ROUTES } from '../../../../shared/variables/application-routes';
import { CompNoContent } from '../../../layout/comp-no-content/comp-no-content';

@Component({
    selector: 'app-comp-media-event-list-page',
    imports: [
        NzCardModule,
        NzButtonModule,
        NzSelectModule,
        NzRadioModule,
        ReactiveFormsModule,
        ReactiveFormsModule,
        CompNoContent,
    ],
    templateUrl: './comp-media-event-list-page.html',
    styleUrl: './comp-media-event-list-page.scss',
    providers: [UC_MediaEvent_GetAllMediaEvents],
})
export class CompMediaEventListPage implements OnInit {
    // dependency injections
    private readonly UC_GetAllMediaEvents = inject(UC_MediaEvent_GetAllMediaEvents);
    private readonly messageRepository = inject(IT_MESSAGE_REPOSITORY);
    private readonly formBuilder = inject(NonNullableFormBuilder);
    private readonly router = inject(Router);

    public readonly convertSortingFilter = convertSortingFilterToGerman;

    public userMediaEvents: WritableSignal<M_MediaEventListItem[] | null> = signal(null);
    public destroyReference = inject(DestroyRef);
    public isError: boolean = false;
    public sortingFilterList: T_ListSortingItem[] = LIST_SORTINGS;
    public sortingFilter: T_ListSortingItem = this.sortingFilterList[0];
    public sortingFilterForm = this.formBuilder.group({
        currentFilter: this.formBuilder.control<T_ListSortingItem>('ALPHABET', [
            Validators.required,
        ]),
    });

    ngOnInit(): void {
        this.getAllMediaEvents();
        this.sortingFilterForm.controls.currentFilter.valueChanges.subscribe(
            (value: T_ListSortingItem) => this.setSortingFilter(value),
        );
    }

    public getAllMediaEvents = () => {
        this.UC_GetAllMediaEvents.execute()
            .pipe(takeUntilDestroyed(this.destroyReference))
            .subscribe({
                next: (resMediaEvents: M_MediaEventListItemResponse) => {
                    this.userMediaEvents.set(
                        resMediaEvents.mediaEvents.sort(
                            (a: M_MediaEventListItem, b: M_MediaEventListItem) =>
                                a.title.localeCompare(b.title),
                        ),
                    );
                },
                error: () => {
                    this.isError = true;
                },
            });
    };

    public setSortingFilter = (newFilter: T_ListSortingItem) => {
        if (!this.userMediaEvents()) {
            return;
        }

        const currentList: M_MediaEventListItem[] =
            newFilter === 'ALPHABET'
                ? this.userMediaEvents()!.sort((a: M_MediaEventListItem, b: M_MediaEventListItem) =>
                      a.title.localeCompare(b.title),
                  )
                : newFilter === 'ALPHABET_INVERTED'
                  ? this.userMediaEvents()!.sort(
                        (a: M_MediaEventListItem, b: M_MediaEventListItem) =>
                            b.title.localeCompare(a.title),
                    )
                  : this.userMediaEvents()!.sort(
                        (a: M_MediaEventListItem, b: M_MediaEventListItem) =>
                            new Date(a.eventCreated).getTime() - new Date(b.eventCreated).getTime(),
                    );

        this.userMediaEvents.set(currentList);
        this.messageRepository.showMessage('success', 'Medienevents erfolgreich sortiert.');
    };

    public navigateToMediaEventDetailsPage = (mediaID: string) => {
        this.router.navigateByUrl(
            APPLICATION_ROUTES.mediaEvent.showMediaEventDetails.relativePath + mediaID,
        );
    };
}
