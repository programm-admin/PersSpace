import { Route } from '@angular/router';

export type T_ApplicationRoute = {
  route: Route;
  isVisible: boolean;
};

export type T_ApplicationRoutes = {
  initial: T_ApplicationRoute;
  start: T_ApplicationRoute;
  login: T_ApplicationRoute;
  userStart: T_ApplicationRoute
};
