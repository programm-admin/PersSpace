import { authGuard } from '../../presentation/guards/auth-guard/auth-guard';
import { CompLoginPage } from '../../presentation/pages/comp-login-page/comp-login-page';
import { CompStartPage } from '../../presentation/pages/comp-start-page/comp-start-page';
import { CompUserStartPage } from '../../presentation/pages/comp-user-start-page/comp-user-start-page';
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
        route: { path: 'user/start', component: CompUserStartPage },
        isVisible: false,
        title: 'Persönliche Startseite',
    },
    mediaEvent: {
        createEvent: {
            route: {
                path: 'user/media-event/create',
                loadComponent: () =>
                    import('../../presentation/pages/comp-create-media-event-page/comp-create-media-event-page').then(
                        (comp) => comp.CompCreateMediaEventPage,
                    ),
            },
            isVisible: true,
            title: 'Medienevent erstellen',
        },
        showAllEvents: {
            route: {
                path: 'user/media-event/all',
                loadComponent: () =>
                    import('../../presentation/pages/media-events/comp-media-event-list-page/comp-media-event-list-page').then(
                        (comp) => comp.CompMediaEventListPage,
                    ),
            },
            isVisible: true,
            title: 'Meine Medienevents',
        },
    },
};
