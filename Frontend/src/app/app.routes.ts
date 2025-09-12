import { Routes } from '@angular/router';
import { CompStartPage } from './_components/pages/comp-start-page/comp-start-page';
import { APPLICATION_ROUTES } from './shared/variables/application-routes';
import { T_ApplicationRoute } from './shared/types-and-interfaces/application-route';

export const routes: Routes = [
  ...APPLICATION_ROUTES.map((route: T_ApplicationRoute) => route.route),
];
