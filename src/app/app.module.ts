/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { LandSearchServicesModule } from './search/land-search-services.module';
import { SharedModule } from './shared/shared.module';

import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [ AppComponent ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    HttpClientModule,
    CoreModule,
    LandSearchServicesModule,
    FlexLayoutModule,
    SharedModule.forRoot(),

    AppRoutingModule
  ],

  providers: [],

})
export class AppModule { }
