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
    requiredPath: string,
): T_ApplicationRoute[] => {
    return Object.values(routes).flatMap((value) => {
        if (isEntryOfTypeObject(value)) {
            return value.isVisible && value.route.path?.includes(requiredPath) ? [value] : [];
        }

        return getVisibleAppRoutes(value, requiredPath);
    });
};

export const getEventCreationRoutes = (
    routes: ApplicationRouteNode = APPLICATION_ROUTES,
): T_ApplicationRoute[] => {
    const requiredPath: string = 'user/general-event/';

    return Object.values(routes).flatMap((value) => {
        if (isEntryOfTypeObject(value)) {
            return value.isVisible && value.route.path?.includes(requiredPath) ? [value] : [];
        }

        return getVisibleAppRoutes(value, requiredPath);
    });
};

export const getUserSettingsRoutes = (
    routes: ApplicationRouteNode = APPLICATION_ROUTES,
): T_ApplicationRoute[] => {
    const requiredPath: string = 'user/general/';
    return Object.values(routes).flatMap((value) => {
        if (isEntryOfTypeObject(value)) {
            return value.isVisible && value.route.path?.startsWith(requiredPath) ? [value] : [];
        }

        return getVisibleAppRoutes(value, requiredPath);
    });
};
