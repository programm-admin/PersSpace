export type M_MediaEvent = {
    id: string;
    title: string;
    notes: string;
    start: Date;
    end: Date;
    isDone: boolean;
    mediaEventCreated: Date;
};
export type M_MediaEventResponse = {
    mediaEvent: M_MediaEvent;
};

export type M_MediaEventListItem = Omit<M_MediaEvent, 'userAccountID' | 'notes'>;
export type M_MediaEventListItemResponse = { mediaEvents: M_MediaEventListItem[] };
export type M_MediaEventUpdateResponse = { mediaEvent: M_MediaEventListItem };

export type M_ModelCreate = Omit<M_MediaEvent, 'id' | 'userAccountID'>;
