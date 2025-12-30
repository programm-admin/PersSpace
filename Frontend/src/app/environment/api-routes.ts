import { T_APIRoute } from '../shared/types-and-interfaces/api-route';
import { BACKEND_ID } from './env';

export const API_ROUTES: T_APIRoute = {
    login: BACKEND_ID + 'auth/login',
    checkUserSession: BACKEND_ID + 'auth/check',
    mediaEvent: {
        create: BACKEND_ID + 'user/MediaEvent/create',
        getAll: BACKEND_ID + 'user/MediaEvent/all',
    },
};
