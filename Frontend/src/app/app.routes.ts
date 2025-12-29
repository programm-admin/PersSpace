import { Routes } from '@angular/router';
import { APPLICATION_ROUTES } from './shared/variables/application-routes';

export const routes: Routes = [
    APPLICATION_ROUTES.initial,
    APPLICATION_ROUTES.start,
    APPLICATION_ROUTES.userStart,
    APPLICATION_ROUTES.login,
    APPLICATION_ROUTES.mediaEvent.createEvent,
    APPLICATION_ROUTES.mediaEvent.showAllEvents,
];
