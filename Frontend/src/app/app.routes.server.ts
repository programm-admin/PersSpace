import { RenderMode, ServerRoute } from '@angular/ssr';
import { APPLICATION_ROUTES } from './shared/variables/application-routes';

export const serverRoutes: ServerRoute[] = [
    {
        path: APPLICATION_ROUTES.mediaEvent.showMediaEventDetails.route.path!,
        renderMode: RenderMode.Server,
    },
    {
        path: '**',
        renderMode: RenderMode.Prerender,
    },
];
