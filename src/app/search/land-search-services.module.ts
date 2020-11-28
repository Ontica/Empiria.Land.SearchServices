/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchFormComponent, SearchKioskComponent } from './index';
import { SearchServicesRoutingModule } from './search.routes';

import { SharedModule } from './../shared/shared.module';

import { SearchApiHttpProvider } from './providers/search-api.http.provider';
import { CoreModule } from '@app/core/core.module';

@NgModule({
  imports: [CommonModule, SearchServicesRoutingModule, SharedModule, CoreModule],
  declarations: [SearchFormComponent, SearchKioskComponent],
  exports: [SearchFormComponent, SearchKioskComponent],
  providers: [SearchApiHttpProvider]
})
export class LandSearchServicesModule { }
