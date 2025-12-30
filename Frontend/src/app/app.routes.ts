import { Routes } from '@angular/router';
import { APPLICATION_ROUTES } from './shared/variables/application-routes';

export const routes: Routes = [
    APPLICATION_ROUTES.initial.route,
    APPLICATION_ROUTES.start.route,
    APPLICATION_ROUTES.userStart.route,
    APPLICATION_ROUTES.login.route,
    APPLICATION_ROUTES.mediaEvent.createEvent.route,
    APPLICATION_ROUTES.mediaEvent.showAllEvents.route,
];
