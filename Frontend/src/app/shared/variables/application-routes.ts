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
        title: 'Initialseite',
        isVisible: false,
    },
    start: {
        route: { path: 'start', component: CompStartPage },
        isVisible: false,
        title: 'Start',
    },
    login: {
        route: { path: 'login', component: CompLoginPage },
        isVisible: true,
        title: 'Loginseite',
    },
    userStart: {
        route: { path: 'user/start', component: CompUserStartPage, canActivate: [authGuard] },
        isVisible: false,
        title: 'Persönliche Startseite',
    },
    createEvent: {
        route: {
            path: 'user/event/create',
            loadComponent: () =>
                import(
                    '../../_components/pages/comp-create-event-page/comp-create-event-page'
                ).then((comp) => comp.CompCreateEventPage),
        },
        isVisible: true,
        title: 'Event erstellen',
    },
};
