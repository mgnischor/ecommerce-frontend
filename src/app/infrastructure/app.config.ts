import {
    APP_INITIALIZER,
    ApplicationConfig,
    provideBrowserGlobalErrorListeners,
    provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from '../application/app.routes';
import { authInterceptor, errorInterceptor } from './interceptors';
import { TranslateService } from './i18n';

export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideZonelessChangeDetection(),
        provideRouter(routes),
        provideHttpClient(withInterceptors([authInterceptor, errorInterceptor])),
        {
            provide: APP_INITIALIZER,
            useFactory: (translate: TranslateService) => () => translate.init(),
            deps: [TranslateService],
            multi: true,
        },
    ],
};
