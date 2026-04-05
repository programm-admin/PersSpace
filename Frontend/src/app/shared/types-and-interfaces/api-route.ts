export type T_APIRoute = {
    user: {
        login: string;
        logout: string;
    };
    checkUserSession: string;
    generalEvent: {
        create: string;
        getAll: string;
        getGeneralEvent: string;
        updateGeneralEvent: string;
        deleteGeneralEvent: string;
    };
};
