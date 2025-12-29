export type M_MediaEvent = {
    id: string;
    userAccountID: string;
    title: string;
    notes: string;
    start: Date;
    end: Date;
    isDone: boolean;
    eventCreated: Date;
};

export type M_MediaEventResponse = {
    mediaEvent: M_MediaEvent;
};

export type M_ModelCreate = Omit<M_MediaEvent, 'id' | 'userAccountID'>;
