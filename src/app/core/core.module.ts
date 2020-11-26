/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { CommonModule } from '@angular/common';


import { ExceptionHandler } from './general/exception-handler';
import { SessionService } from './general/session.service';
import { LoggerService } from './general/logger.service';
import { ApplicationSettingsService } from './general/application-settings.service';

import { DirectoryService } from './http/directory.service';
import { HttpHandler } from './http/http-handler';
import { HttpService } from './http/http.service';
import { HttpErrorInterceptor } from './http/http-error-interceptor';

import { throwIfAlreadyLoaded } from './module-import-guard';


@NgModule({

  imports: [
    CommonModule,
    HttpClientModule    
  ],

  declarations: [],

  exports: [],

  providers: [
    ExceptionHandler,
    SessionService,
    ApplicationSettingsService,
    LoggerService,   
    HttpHandler,
    HttpService,
    DirectoryService,

    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }

  ]
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

}
