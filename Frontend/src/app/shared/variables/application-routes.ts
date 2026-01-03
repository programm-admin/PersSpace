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
            route: { path: 'login', component: CompLoginPage },
            relativePath: '',
            isVisible: true,
            title: 'Loginseite',
        },
        userStart: {
            route: { path: 'user/start', component: CompUserStartPage },
            relativePath: '',
            isVisible: false,
            title: 'Persönliche Startseite',
        },
    },
    mediaEvent: {
        createMediaEvent: {
            route: {
                path: 'user/media-event/create',
                loadComponent: () =>
                    import('../../presentation/pages/comp-create-media-event-page/comp-create-media-event-page').then(
                        (comp) => comp.CompCreateMediaEventPage,
                    ),
            },
            relativePath: '',
            isVisible: true,
            title: 'Medienevent erstellen',
        },
        showAllMediaEvents: {
            route: {
                path: 'user/media-event/all',
                loadComponent: () =>
                    import('../../presentation/pages/media-events/comp-media-event-list-page/comp-media-event-list-page').then(
                        (comp) => comp.CompMediaEventListPage,
                    ),
            },
            relativePath: '',
            isVisible: true,
            title: 'Meine Medienevents',
        },
        showMediaEventDetails: {
            route: {
                path: 'user/media-event/:id',
                loadComponent: () =>
                    import('../../presentation/pages/media-events/comp-media-event-details-page/comp-media-event-details-page').then(
                        (comp) => comp.CompMediaEventDetailsPage,
                    ),
            },
            relativePath: 'user/media-event/',
            isVisible: false,
            title: 'Medieneventdetails',
        },
    },
};
