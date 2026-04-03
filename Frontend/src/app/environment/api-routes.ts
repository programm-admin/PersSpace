import { T_APIRoute } from '../shared/types-and-interfaces/api-route';
import { BACKEND_ID } from './env';


export const API_ROUTES: T_APIRoute = {
    user: {
        login: BACKEND_ID + 'auth/login',
        logout: BACKEND_ID + 'auth/logout',
    },
    checkUserSession: BACKEND_ID + 'auth/check',
    generalEvent: {
        create: BACKEND_ID + 'user/GeneralEvent/create',
        getAll: BACKEND_ID + 'user/GeneralEvent/all',
        getGeneralEvent: BACKEND_ID + 'user/GeneralEvent/', // + id
        updateGeneralEvent: BACKEND_ID + 'user/GeneralEvent/update',
        deleteGeneralEvent: BACKEND_ID + 'user/GeneralEvent/delete',
    },
};
