import { APP_BASE_HREF } from '@angular/common';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideFileRouter, requestContextInterceptor } from '@analogjs/router';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideFileRouter(),
    { provide: APP_BASE_HREF, useValue: '/ngAtoms-docs/' },
    provideHttpClient(
      withFetch(),
      withInterceptors([requestContextInterceptor])
    ),
    provideClientHydration(withEventReplay()),
  ],
};
