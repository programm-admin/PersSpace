import { CompLoginPage } from '../../_components/pages/comp-login-page/comp-login-page';
import { CompStartPage } from '../../_components/pages/comp-start-page/comp-start-page';
import { T_ApplicationRoute } from '../types-and-interfaces/application-route';

export const APPLICATION_ROUTES: T_ApplicationRoute[] = [
  {
    route: {
      path: '',
      redirectTo: '/start',
      pathMatch: 'full',
    },
    isVisible: false,
  },
  {
    route: { path: 'start', component: CompStartPage },
    isVisible: false,
  },
  {
    route: {
      path: 'login',
      component: CompLoginPage,
    },
    isVisible: true,
  },
  {
    route: {
      path: '**',
      redirectTo: '/start',
    },
    isVisible: false,
  },
];
