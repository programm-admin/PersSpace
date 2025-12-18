export type M_Model = {
    id: string;
    userAccountID: string;
    title: string;
    notes: string;
    start: Date;
    end: Date;
    isDone: boolean;
    eventCreated: Date;
};

export type M_ModelCreate = Omit<M_Model, 'id' | 'userAccountID'>;
