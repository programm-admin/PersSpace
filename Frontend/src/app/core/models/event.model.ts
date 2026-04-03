export type M_GeneralEvent = {
    id: string;
    title: string;
    notes: string;
    start: Date;
    end: Date;
    isDone: boolean;
    generalEventCreated: Date;
};
export type M_GeneralEventResponse = {
    generalEvent: M_GeneralEvent;
};

export type M_GeneralEventListItem = Omit<M_GeneralEvent, 'userAccountID' | 'notes'>;
export type M_GeneralEventListItemResponse = { generalEvents: M_GeneralEventListItem[] };
export type M_GeneralEventUpdateResponse = { generalEvent: M_GeneralEventListItem };

export type M_ModelCreate = Omit<M_GeneralEvent, 'id' | 'userAccountID'>;
