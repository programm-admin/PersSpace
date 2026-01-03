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
    mediaEvent: {
        createMediaEvent: T_ApplicationRoute;
        showAllMediaEvents: T_ApplicationRoute;
        showMediaEventDetails: T_ApplicationRoute;
    };
};

export type ApplicationRouteNode = T_ApplicationRoute | { [key: string]: ApplicationRouteNode };
