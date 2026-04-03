import { Component, computed, DestroyRef, inject, OnInit, Signal } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { UC_GeneralEvent_GetAllMediaEvents } from '../../../../core/use-cases/event/general-event/get-all-general-events.use-case';
import { M_GeneralEventListItem } from '../../../../core/models/event.model';
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
import { IT_A_GENERAL_EVENT_REPOSITORY } from '../../../../core/repositories/queries/event/general-event.query.repository';

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
    templateUrl: './comp-general-event-list-page.html',
    styleUrl: './comp-general-event-list-page.scss',
    providers: [UC_GeneralEvent_GetAllMediaEvents],
})
export class CompGenerlEventListPage implements OnInit {
    // dependency injections
    private readonly messageRepository = inject(IT_MESSAGE_REPOSITORY);
    private readonly generalEventAdapter = inject(IT_A_GENERAL_EVENT_REPOSITORY);
    private readonly formBuilder = inject(NonNullableFormBuilder);
    private readonly router = inject(Router);

    public readonly convertSortingFilter = convertSortingFilterToGerman;

    public userGeneralEvents: Signal<M_GeneralEventListItem[] | null> = computed(() =>
        this.filterItemList(
            'ALPHABET',
            this.generalEventAdapter.Q_getGeneralEvents?.data()?.generalEvents  ,
        ),
    );
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
        this.sortingFilterForm.controls.currentFilter.valueChanges.subscribe(
            (value: T_ListSortingItem) => this.setSortingFilter(value),
        );
    }

    public setSortingFilter = (newFilter: T_ListSortingItem) => {
        if (!this.userGeneralEvents()) {
            return;
        }

        newFilter === 'ALPHABET'
            ? this.userGeneralEvents()!.sort((a: M_GeneralEventListItem, b: M_GeneralEventListItem) =>
                  a.title.localeCompare(b.title),
              )
            : newFilter === 'ALPHABET_INVERTED'
              ? this.userGeneralEvents()!.sort((a: M_GeneralEventListItem, b: M_GeneralEventListItem) =>
                    b.title.localeCompare(a.title),
                )
              : this.userGeneralEvents()!.sort(
                    (a: M_GeneralEventListItem, b: M_GeneralEventListItem) =>
                        new Date(a.generalEventCreated).getTime() -
                        new Date(b.generalEventCreated).getTime(),
                );

        // this.userMediaEvents.set(currentList);
        this.messageRepository.showMessage('success', 'Medienevents erfolgreich sortiert.');
    };

    public navigateToGeneralEventDetailsPage = (mediaID: string) => {
        this.router.navigateByUrl(
            APPLICATION_ROUTES.generalEvent.showGeneralEventDetails.relativePath + mediaID,
        );
    };

    private filterItemList = (
        filter: T_ListSortingItem,
        items: M_GeneralEventListItem[] | undefined,
    ): M_GeneralEventListItem[] | null => {
        if (!items) {
            return null;
        }

        switch (filter) {
            case 'ALPHABET':
                return items.sort((a: M_GeneralEventListItem, b: M_GeneralEventListItem) =>
                    a.title.localeCompare(b.title),
                );
            case 'ALPHABET_INVERTED':
                return items.sort((a: M_GeneralEventListItem, b: M_GeneralEventListItem) =>
                    b.title.localeCompare(a.title),
                );
            case 'CREATION_DATE':
                return items.sort(
                    (a: M_GeneralEventListItem, b: M_GeneralEventListItem) =>
                        new Date(a.generalEventCreated).getTime() -
                        new Date(b.generalEventCreated).getTime(),
                );
        }
    };
}
