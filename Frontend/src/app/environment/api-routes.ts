import { T_APIRoute } from '../shared/types-and-interfaces/api-route';
import { BACKEND_ID } from './env';

export const API_ROUTES: T_APIRoute = {
    login: BACKEND_ID + 'auth/login',
    checkUserSession: BACKEND_ID + 'auth/check',
    mediaEvent: {
        create: 'user/MediaEvent/create',
        getAll: 'user/MediaEvent/all',
    },
};
