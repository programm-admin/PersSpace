import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { T_MessageRepository } from '../../../core/repositories/message.repository';
import { M_MessageType } from '../../../core/models/message.model';
import { isPlatformBrowser } from '@angular/common';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
    providedIn: 'root',
})
export class MessageService implements T_MessageRepository {
    // injection variables
    private readonly notificationService = inject(NzNotificationService);
    private readonly platformID = inject(PLATFORM_ID);

    public showMessage = (notiType: M_MessageType, notiTitle: string, notiContent?: string) => {
        if (!isPlatformBrowser(this.platformID)) {
            return;
        }
        this.notificationService.create(notiType, notiTitle, notiContent ?? '', {
            nzPlacement: 'topRight',
            nzDuration: 0, // notification won't disappear until user closes it manually
        });
    };
}
