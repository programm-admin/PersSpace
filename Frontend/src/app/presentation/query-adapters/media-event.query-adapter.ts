import { computed, Inject, inject, signal, Signal, WritableSignal } from '@angular/core';
import { IT_MEDIA_EVENT_REPOSITORY } from '../../core/repositories/events/media-event.repository';
import { injectMutation, injectQuery } from '@tanstack/angular-query-experimental';
import { QKEYS_MediaEvents } from './media-event.query-keys';
import { firstValueFrom } from 'rxjs';
import {
    M_MediaEvent,
    M_MediaEventResponse,
    M_MediaEventUpdateResponse,
} from '../../core/models/event.model';
import { tanStackQueryClient } from '../../query-client';
import { IT_MESSAGE_REPOSITORY } from '../../core/repositories/message.repository';
import { Router } from '@angular/router';
import { AT_MediaRepository } from '../../core/repositories/queries/event/media-event.query.repository';
import { APPLICATION_ROUTES } from '../../shared/variables/application-routes';
import { MEDIA_EVENT_ID } from '../../core/repositories/other/media-id.token';

export class Adapter_MediaEvents implements AT_MediaRepository {
    private readonly mediaEventRepository = inject(IT_MEDIA_EVENT_REPOSITORY);
    private readonly messageRepository = inject(IT_MESSAGE_REPOSITORY);
    private readonly router = inject(Router);
    private readonly mediaEventId: WritableSignal<string | null> = signal<string | null>(null);

    public setMediaEventId = (id: string | null) => this.mediaEventId.set(id);

    public readonly Q_createMediaEvent = injectMutation<
        M_MediaEventResponse,
        unknown,
        M_MediaEvent
    >(() => ({
        mutationFn: (newEvent: M_MediaEvent) =>
            firstValueFrom(this.mediaEventRepository.createMediaEvent(newEvent)),

        onSuccess: (data) => {
            tanStackQueryClient.invalidateQueries({
                queryKey: QKEYS_MediaEvents.list(),
            });

            this.messageRepository.showMessage(
                'success',
                `Medienevent '${data.mediaEvent.title}' erfolgreich angelegt.`,
            );

            this.router.navigateByUrl(APPLICATION_ROUTES.mediaEvent.showAllMediaEvents.route.path!);
        },

        onError: (_, newEvent) =>
            this.messageRepository.showMessage(
                'error',
                `Beim Anlegen von '${newEvent.title}' ist ein Fehler aufgetreten.`,
            ),
    }));

    public readonly Q_updateMediaEvent = injectMutation<
        M_MediaEventUpdateResponse,
        unknown,
        M_MediaEvent
    >(() => ({
        mutationFn: (newEvent: M_MediaEvent) =>
            firstValueFrom(this.mediaEventRepository.updateMediaEvent(newEvent)),

        onSuccess: (data) => {
            tanStackQueryClient.invalidateQueries({
                queryKey: QKEYS_MediaEvents.list(),
            });

            this.messageRepository.showMessage(
                'success',
                `Medienevent '${data.mediaEvent.title}' erfolgreich angepasst.`,
            );

            this.router.navigateByUrl(APPLICATION_ROUTES.mediaEvent.showAllMediaEvents.route.path!);
        },

        onError: (_, newEvent) =>
            this.messageRepository.showMessage(
                'error',
                `Beim Updaten von '${newEvent.title}' ist ein Fehler aufgetreten.`,
            ),
    }));

    public readonly Q_getMediaEvents = injectQuery(() => ({
        queryKey: QKEYS_MediaEvents.list(),
        queryFn: () => firstValueFrom(this.mediaEventRepository.getAllMediaEvents()),
    }));

    public Q_getSingleMediaEvent = injectQuery(() => ({
        queryKey: QKEYS_MediaEvents.singleEvent(this.mediaEventId()!),
        queryFn: () =>
            firstValueFrom(this.mediaEventRepository.getMediaEvent(this.mediaEventId()!)),
        enabled: computed(() => !!this.mediaEventId()),
    }));
}
