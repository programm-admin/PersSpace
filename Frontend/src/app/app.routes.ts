import { Routes } from '@angular/router';
import { CompStartPage } from './_components/pages/comp-start-page/comp-start-page';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/start' },
  {
    path: 'start',
    component: CompStartPage,
  },
  {
    path: '**',
    redirectTo: '/start',
  },
];
