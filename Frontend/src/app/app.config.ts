import {
    ApplicationConfig,
    provideBrowserGlobalErrorListeners,
    provideZoneChangeDetection,
    importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { icons } from './icons-provider';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { getProviders } from './app.providers';
import { NzConfig, provideNzConfig } from 'ng-zorro-antd/core/config';
import { httpInterceptor } from './presentation/interceptors/http/http-interceptor';
import { provideAngularQuery } from '@tanstack/angular-query-experimental';
import { tanStackQueryClient } from './query-client';

const ngZorroConfig: NzConfig = {
    message: { nzTop: 10, nzDuration: 10000 },
    notification: { nzTop: 240 },
};

registerLocaleData(en);

export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideClientHydration(withEventReplay()),
        provideNzIcons(icons),
        provideNzI18n(en_US),
        importProvidersFrom(FormsModule),
        provideAnimationsAsync(),
        provideHttpClient(withFetch(), withInterceptors([httpInterceptor])),
        ...getProviders(),
        provideNzConfig(ngZorroConfig),
        provideAngularQuery(tanStackQueryClient),
    ],
};
