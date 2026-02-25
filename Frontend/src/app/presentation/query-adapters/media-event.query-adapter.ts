import { computed, inject, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { IT_MEDIA_EVENT_REPOSITORY } from '../../core/repositories/events/media-event.repository';
import { injectMutation, injectQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { QKEYS_MediaEvents } from './media-event.query-keys';
import { firstValueFrom } from 'rxjs';
import {
    M_MediaEvent,
    M_MediaEventResponse,
    M_MediaEventUpdateResponse,
} from '../../core/models/event.model';
import { IT_MESSAGE_REPOSITORY } from '../../core/repositories/message.repository';
import { Router } from '@angular/router';
import { AT_MediaRepository } from '../../core/repositories/queries/event/media-event.query.repository';
import { APPLICATION_ROUTES } from '../../shared/variables/application-routes';
import { isPlatformBrowser } from '@angular/common';

export class Adapter_MediaEvents implements AT_MediaRepository {
    private readonly mediaEventRepository = inject(IT_MEDIA_EVENT_REPOSITORY);
    private readonly messageRepository = inject(IT_MESSAGE_REPOSITORY);
    private readonly router = inject(Router);
    private readonly mediaEventId: WritableSignal<string | null> = signal<string | null>(null);
    private readonly platformId = inject(PLATFORM_ID);
    private readonly queryClient = inject(QueryClient);

    public setMediaEventId = (id: string | null) => this.mediaEventId.set(id);

    public readonly Q_createMediaEvent = isPlatformBrowser(this.platformId)
        ? injectMutation<M_MediaEventResponse, unknown, M_MediaEvent>(() => ({
              mutationFn: (newEvent: M_MediaEvent) =>
                  firstValueFrom(this.mediaEventRepository.createMediaEvent(newEvent)),

              onSuccess: (data) => {
                  if (this.queryClient) {
                      this.queryClient.invalidateQueries({
                          queryKey: QKEYS_MediaEvents.list(),
                      });

                      this.messageRepository.showMessage(
                          'success',
                          `Medienevent '${data.mediaEvent.title}' erfolgreich angelegt.`,
                      );

                      this.router.navigateByUrl(
                          APPLICATION_ROUTES.mediaEvent.showAllMediaEvents.route.path!,
                      );
                  }
              },

              onError: (_, newEvent) =>
                  this.messageRepository.showMessage(
                      'error',
                      `Beim Anlegen von '${newEvent.title}' ist ein Fehler aufgetreten.`,
                  ),
          }))
        : undefined;

    public readonly Q_updateMediaEvent = isPlatformBrowser(this.platformId)
        ? injectMutation<M_MediaEventUpdateResponse, unknown, M_MediaEvent>(() => ({
              mutationFn: (newEvent: M_MediaEvent) =>
                  firstValueFrom(this.mediaEventRepository.updateMediaEvent(newEvent)),

              onSuccess: (data) => {
                  if (this.queryClient) {
                      this.queryClient.invalidateQueries({
                          queryKey: QKEYS_MediaEvents.list(),
                      });
                      this.queryClient.invalidateQueries({
                          queryKey: QKEYS_MediaEvents.singleEvent(data.mediaEvent.id),
                      });

                      this.messageRepository.showMessage(
                          'success',
                          `Medienevent '${data.mediaEvent.title}' erfolgreich angepasst.`,
                      );
                  }
              },

              onError: (_, newEvent) =>
                  this.messageRepository.showMessage(
                      'error',
                      `Beim Updaten von '${newEvent.title}' ist ein Fehler aufgetreten.`,
                  ),
          }))
        : undefined;

    public readonly Q_getMediaEvents = isPlatformBrowser(this.platformId)
        ? injectQuery(() => ({
              queryKey: QKEYS_MediaEvents.list(),
              queryFn: () => firstValueFrom(this.mediaEventRepository.getAllMediaEvents()),
          }))
        : undefined;

    public Q_getSingleMediaEvent = isPlatformBrowser(this.platformId)
        ? injectQuery(() => ({
              queryKey: QKEYS_MediaEvents.singleEvent(this.mediaEventId()!),
              queryFn: () =>
                  firstValueFrom(this.mediaEventRepository.getMediaEvent(this.mediaEventId()!)),
              enabled: computed(() => isPlatformBrowser(this.platformId) && !!this.mediaEventId()),
          }))
        : undefined;

    public Q_deleteMediaEvent = isPlatformBrowser(this.platformId)
        ? injectMutation<any, unknown, string>(() => ({
              mutationFn: (mediaEventId: string) =>
                  firstValueFrom(this.mediaEventRepository.deleteMediaEvent(mediaEventId)),
              onSuccess: () => {
                  if (this.queryClient) {
                      this.queryClient.invalidateQueries({ queryKey: QKEYS_MediaEvents.all });
                      this.queryClient.removeQueries({
                          queryKey: QKEYS_MediaEvents.singleEvent(this.mediaEventId()!),
                      });

                      this.messageRepository.showMessage(
                          'success',
                          'Medienevent erfolgreich gelöscht.',
                      );
                      this.router.navigateByUrl(
                          APPLICATION_ROUTES.mediaEvent.showAllMediaEvents.route.path!,
                      );
                  }
              },
              onError: () =>
                  this.messageRepository.showMessage(
                      'error',
                      'Fehler beim Löschen des Medienevenets.',
                  ),
          }))
        : undefined;
}
