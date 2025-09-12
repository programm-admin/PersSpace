import { T_ApplicationRoute } from '../types-and-interfaces/application-route';
import { APPLICATION_ROUTES } from '../variables/application-routes';

export const getVisibleAppRoutes = (): T_ApplicationRoute[] => {
  return APPLICATION_ROUTES.filter((route: T_ApplicationRoute) => route.isVisible);
};
