import { Routes } from '@angular/router';
import { APPLICATION_ROUTES } from './shared/variables/application-routes';
import { T_ApplicationRoute } from './shared/types-and-interfaces/application-route';

export const routes: Routes = [
  ...Object.entries(APPLICATION_ROUTES).map(
    (entry: [string, T_ApplicationRoute]) => entry[1].route,
  ),
];
