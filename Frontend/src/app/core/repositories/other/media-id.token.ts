import { InjectionToken, Signal } from '@angular/core';

export const MEDIA_EVENT_ID = new InjectionToken<Signal<string | null>>('MEDIA_EVENT_ID');
