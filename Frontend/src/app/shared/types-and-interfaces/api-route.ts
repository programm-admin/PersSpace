export type T_APIRoute = {
    user: {
        login: string;
        logout: string;
    };
    checkUserSession: string;
    mediaEvent: {
        create: string;
        getAll: string;
    };
};
