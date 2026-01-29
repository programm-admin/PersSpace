import { Provider } from '@angular/core';
import { IT_USER_REPOSITORY } from './core/repositories/user.repository';
import { UserService } from './infrastructure/services/user-service';
import { IT_STRING_REPOSITORY } from './core/repositories/string.repository';
import { StringService } from './infrastructure/services/string-service/string-service';
import { IT_STORAGE_REPOSITORY } from './core/repositories/storage.repository';
import { StorageService } from './infrastructure/services/storage-service/storage-service';
import { IT_GOOGLE_REPOSITORY } from './core/repositories/google.repository';
import { GoogleAuthService } from './infrastructure/services/google-service/google-service';
import { IT_MESSAGE_REPOSITORY } from './core/repositories/message.repository';
import { MessageService } from './infrastructure/services/message-service/message-service';
import { IT_MEDIA_EVENT_REPOSITORY } from './core/repositories/events/media-event.repository';
import { MediaEventService } from './infrastructure/services/events/media-event-service/media-event-service';
import { IT_LOADING_REPOSITORY } from './core/repositories/loading.repository';
import { LoadingService } from './infrastructure/services/loading-service/loading-service';
import { IT_A_MEDIA_EVENT_REPOSITORY } from './core/repositories/queries/event/media-event.query.repository';
import { Adapter_MediaEvents } from './presentation/query-adapters/media-event.query-adapter';

export const getProviders = (): Provider[] => {
    return [
        { provide: IT_USER_REPOSITORY, useClass: UserService },
        { provide: IT_STRING_REPOSITORY, useClass: StringService },
        { provide: IT_STORAGE_REPOSITORY, useClass: StorageService },
        { provide: IT_GOOGLE_REPOSITORY, useClass: GoogleAuthService },
        { provide: IT_MESSAGE_REPOSITORY, useClass: MessageService },
        { provide: IT_MEDIA_EVENT_REPOSITORY, useClass: MediaEventService },
        { provide: IT_LOADING_REPOSITORY, useClass: LoadingService },
        { provide: IT_A_MEDIA_EVENT_REPOSITORY, useClass: Adapter_MediaEvents },
    ];
};
