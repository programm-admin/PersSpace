import { Route } from '@angular/router';

export type T_ApplicationRoute = {
    route: Route;
    relativePath: string;
    title: string;
    isVisible: boolean;
};

export type T_ApplicationRoutes = {
    initial: T_ApplicationRoute;
    start: T_ApplicationRoute;
    user: {
        login: T_ApplicationRoute;
        userStart: T_ApplicationRoute;
    };
    generalEvent: {
        createGeneralEvent: T_ApplicationRoute;
        showAllGeneralEvents: T_ApplicationRoute;
        showGeneralEventDetails: T_ApplicationRoute;
    };
};

export type ApplicationRouteNode = T_ApplicationRoute | { [key: string]: ApplicationRouteNode };
