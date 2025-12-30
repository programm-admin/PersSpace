import {
    ApplicationRouteNode,
    T_ApplicationRoute,
} from '../types-and-interfaces/application-route';
import { APPLICATION_ROUTES } from '../variables/application-routes';

const isEntryOfTypeObject = (entry: any): entry is T_ApplicationRoute => {
    return typeof entry === 'object' && entry !== null && 'isVisible' in entry;
};

export const getVisibleAppRoutes = (
    routes: ApplicationRouteNode = APPLICATION_ROUTES,
): T_ApplicationRoute[] => {
    return Object.values(routes).flatMap((value) => {
        if (isEntryOfTypeObject(value)) {
            return value.isVisible ? [value] : [];
        }

        return getVisibleAppRoutes(value);
    });
};

export const getEventCreationRoutes = (
    routes: ApplicationRouteNode = APPLICATION_ROUTES,
): T_ApplicationRoute[] => {
    return Object.values(routes).flatMap((value) => {
        if (isEntryOfTypeObject(value)) {
            return value.isVisible && value.route.path?.includes('/create') ? [value] : [];
        }

        return getVisibleAppRoutes(value);
    });
};

export const getUserSettingsRoutes = (
    routes: ApplicationRouteNode = APPLICATION_ROUTES,
): T_ApplicationRoute[] => {
    return Object.values(routes).flatMap((value) => {
        if (isEntryOfTypeObject(value)) {
            return value.isVisible && value.route.path?.startsWith('user/') ? [value] : [];
        }

        return getVisibleAppRoutes(value);
    });
};
