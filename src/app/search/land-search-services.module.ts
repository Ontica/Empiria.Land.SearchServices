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
import { DataService } from './../shared/services/data.service';

@NgModule({
  imports: [CommonModule, SearchServicesRoutingModule, SharedModule],
  declarations: [SearchFormComponent, SearchKioskComponent],
  exports: [SearchFormComponent, SearchKioskComponent],
  providers: [DataService]
})
export class LandSearchServicesModule { }
