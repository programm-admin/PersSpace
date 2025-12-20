import { inject, Injectable } from '@angular/core';
import { IT_MESSAGE_REPOSITORY } from '../../repositories/message.repository';
import { M_MessageType } from '../../models/message.model';

@Injectable()
export class UC_Message_ShowMessage {
    private readonly messageRepository = inject(IT_MESSAGE_REPOSITORY);

    public execute = (messageType: M_MessageType, messageContent: string) => {
        return this.messageRepository.showMessage(messageType, messageContent);
    };
}
