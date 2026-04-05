import { computed, inject, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { IT_GENERAL_EVENT_REPOSITORY } from '../../core/repositories/events/general-event.repository';
import { injectMutation, injectQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { QKEYS_GeneralEvents } from './general-event.query-keys';
import { firstValueFrom } from 'rxjs';
import {
    M_GeneralEvent,
    M_GeneralEventResponse,
    M_GeneralEventUpdateResponse,
} from '../../core/models/event.model';
import { IT_MESSAGE_REPOSITORY } from '../../core/repositories/message.repository';
import { Router } from '@angular/router';
import { AT_GeneralEventRepository } from '../../core/repositories/queries/event/general-event.query.repository';
import { APPLICATION_ROUTES } from '../../shared/variables/application-routes';
import { isPlatformBrowser } from '@angular/common';

export class Adapter_GeneralEvents implements AT_GeneralEventRepository {
    private readonly generalEventRepository = inject(IT_GENERAL_EVENT_REPOSITORY);
    private readonly messageRepository = inject(IT_MESSAGE_REPOSITORY);
    private readonly router = inject(Router);
    private readonly generalEventId: WritableSignal<string | null> = signal<string | null>(null);
    private readonly platformId = inject(PLATFORM_ID);
    private readonly queryClient = inject(QueryClient);

    public setMediaEventId = (id: string | null) => this.generalEventId.set(id);

    public readonly Q_createGeneralEvent = isPlatformBrowser(this.platformId)
        ? injectMutation<M_GeneralEventResponse, unknown, M_GeneralEvent>(() => ({
              mutationFn: (newEvent: M_GeneralEvent) =>
                  firstValueFrom(this.generalEventRepository.createGeneralEvent(newEvent)),

              onSuccess: (data) => {
                  if (this.queryClient) {
                      this.queryClient.invalidateQueries({
                          queryKey: QKEYS_GeneralEvents.list(),
                      });

                      this.messageRepository.showMessage(
                          'success',
                          `Event '${data.generalEvent.title}' erfolgreich angelegt.`,
                      );

                      this.router.navigateByUrl(
                          APPLICATION_ROUTES.generalEvent.showAllGeneralEvents.route.path!,
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

    public readonly Q_updateGeneralEvent = isPlatformBrowser(this.platformId)
        ? injectMutation<M_GeneralEventUpdateResponse, unknown, M_GeneralEvent>(() => ({
              mutationFn: (newEvent: M_GeneralEvent) =>
                  firstValueFrom(this.generalEventRepository.updateGeneralEvent(newEvent)),

              onSuccess: (data) => {
                  if (this.queryClient) {
                      this.queryClient.invalidateQueries({
                          queryKey: QKEYS_GeneralEvents.list(),
                      });
                      this.queryClient.invalidateQueries({
                          queryKey: QKEYS_GeneralEvents.singleEvent(data.generalEvent.id),
                      });

                      this.messageRepository.showMessage(
                          'success',
                          `Event '${data.generalEvent.title}' erfolgreich angepasst.`,
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

    public readonly Q_getGeneralEvents = isPlatformBrowser(this.platformId)
        ? injectQuery(() => ({
              queryKey: QKEYS_GeneralEvents.list(),
              queryFn: () => firstValueFrom(this.generalEventRepository.getAllGeneralEvents()),
          }))
        : undefined;

    public Q_getSingleGeneralEvent = isPlatformBrowser(this.platformId)
        ? injectQuery(() => ({
              queryKey: QKEYS_GeneralEvents.singleEvent(this.generalEventId()!),
              queryFn: () =>
                  firstValueFrom(
                      this.generalEventRepository.getGeneralEvent(this.generalEventId()!),
                  ),
              enabled: computed(
                  () => isPlatformBrowser(this.platformId) && !!this.generalEventId(),
              ),
          }))
        : undefined;

    public Q_deleteGeneralEvent = isPlatformBrowser(this.platformId)
        ? injectMutation<any, unknown, string>(() => ({
              mutationFn: (mediaEventId: string) =>
                  firstValueFrom(this.generalEventRepository.deleteGeneralEvent(mediaEventId)),
              onSuccess: () => {
                  if (this.queryClient) {
                      this.queryClient.invalidateQueries({ queryKey: QKEYS_GeneralEvents.all });
                      this.queryClient.removeQueries({
                          queryKey: QKEYS_GeneralEvents.singleEvent(this.generalEventId()!),
                      });

                      this.messageRepository.showMessage('success', 'Event erfolgreich gelöscht.');
                      this.router.navigateByUrl(
                          APPLICATION_ROUTES.generalEvent.showAllGeneralEvents.route.path!,
                      );
                  }
              },
              onError: () =>
                  this.messageRepository.showMessage('error', 'Fehler beim Löschen des Events.'),
          }))
        : undefined;
}
