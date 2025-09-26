import { T_ApplicationRoute } from '../types-and-interfaces/application-route';
import { APPLICATION_ROUTES } from '../variables/application-routes';

export const getVisibleAppRoutes = (): T_ApplicationRoute[] => {
    return Object.entries(APPLICATION_ROUTES)
        .filter((entry: [string, T_ApplicationRoute]) => entry[1].isVisible)
        .map((entry: [string, T_ApplicationRoute]) => entry[1]);
};
