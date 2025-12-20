import { InjectionToken } from '@angular/core';
import { M_MessageType } from '../models/message.model';

export type T_MessageRepository = {
    showMessage: (messageType: M_MessageType, messageContent: string) => void;
};

export const IT_MESSAGE_REPOSITORY = new InjectionToken<T_MessageRepository>('T_MessageRepository');
