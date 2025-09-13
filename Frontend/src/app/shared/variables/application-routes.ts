import { CompLoginPage } from '../../_components/pages/comp-login-page/comp-login-page';
import { CompStartPage } from '../../_components/pages/comp-start-page/comp-start-page';
import { CompUserStartPage } from '../../_components/pages/comp-user-start-page/comp-user-start-page';
import { authGuard } from '../../guards/auth-guard/auth-guard';
import { T_ApplicationRoutes } from '../types-and-interfaces/application-route';

export const APPLICATION_ROUTES: T_ApplicationRoutes = {
  initial: {
    route: {
      path: '',
      redirectTo: '/start',
      pathMatch: 'full',
    },
    isVisible: false,
  },
  start: {
    route: { path: 'start', component: CompStartPage },
    isVisible: false,
  },
  login: {
    route: { path: 'login', component: CompLoginPage },
    isVisible: true,
  },
  userStart: {
    route: { path: 'user/start', component: CompUserStartPage, canActivate: [authGuard] },
    isVisible: false,
  },
};
