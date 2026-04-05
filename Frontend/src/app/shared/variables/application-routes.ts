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
        relativePath: '',
        title: 'Initialseite',
        isVisible: false,
    },
    start: {
        route: { path: 'start', component: CompStartPage },
        relativePath: '',
        isVisible: false,
        title: 'Start',
    },
    user: {
        login: {
            route: { path: 'user/general/login', component: CompLoginPage },
            relativePath: '',
            isVisible: true,
            title: 'Loginseite',
        },
        userStart: {
            route: { path: 'user/general/start', component: CompUserStartPage },
            relativePath: '',
            isVisible: false,
            title: 'Persönliche Startseite',
        },
    },
    generalEvent: {
        createGeneralEvent: {
            route: {
                path: 'user/general-event/create',
                loadComponent: () =>
                    import('../../presentation/pages/comp-create-general-event-page/comp-create-general-event-page').then(
                        (comp) => comp.CompCreateGeneralEventPage,
                    ),
            },
            relativePath: '',
            isVisible: true,
            title: 'Event erstellen',
        },
        showAllGeneralEvents: {
            route: {
                path: 'user/general-event/all',
                loadComponent: () =>
                    import('../../presentation/pages/general-events/comp-general-event-list-page/comp-general-event-list-page').then(
                        (comp) => comp.CompGenerlEventListPage,
                    ),
            },
            relativePath: '',
            isVisible: true,
            title: 'Meine Events',
        },
        showGeneralEventDetails: {
            route: {
                path: 'user/general-event/:id',
                loadComponent: () =>
                    import('../../presentation/pages/general-events/comp-general-event-details-page/comp-general-event-details-page').then(
                        (comp) => comp.CompGeneralEventDetailsPage,
                    ),
            },
            relativePath: 'user/general-event/',
            isVisible: false,
            title: 'Eventdetails',
        },
    },
};
