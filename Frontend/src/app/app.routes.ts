import { Routes } from '@angular/router';
import { StartPage } from './pages/start-page/start-page';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/start' },
  {
    path: 'start',
    component: StartPage,
  },
  {
    path: '**',
    redirectTo: '/start',
  },
];
