import { T_APIRoute } from '../shared/types-and-interfaces/api-route';
import { BACKEND_ID } from './env';

export const API_ROUTES: T_APIRoute = {
    user: {
        login: BACKEND_ID + 'auth/login',
        logout: BACKEND_ID + 'auth/logout',
    },
    checkUserSession: BACKEND_ID + 'auth/check',
    mediaEvent: {
        create: BACKEND_ID + 'user/MediaEvent/create',
        getAll: BACKEND_ID + 'user/MediaEvent/all',
        getMediaEvent: BACKEND_ID + 'user/MediaEvent/', // + id
        updateMediaEvent: BACKEND_ID + 'user/MediaEvent/update',
        deleteMediaEvent: BACKEND_ID + 'user/MediaEvent/delete',
    },
};
