import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { T_MessageRepository } from '../../../core/repositories/message.repository';
import { M_MessageType } from '../../../core/models/message.model';
import { NzMessageService } from 'ng-zorro-antd/message';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root',
})
export class MessageService implements T_MessageRepository {
    // injection variables
    private readonly ngMessageService = inject(NzMessageService);
    private readonly platformID = inject(PLATFORM_ID);

    public showMessage = (messageType: M_MessageType, messageContent: string) => {
        if (!isPlatformBrowser(this.platformID)) {
            return;
        }
        this.ngMessageService.create(messageType, messageContent);
    };
}
