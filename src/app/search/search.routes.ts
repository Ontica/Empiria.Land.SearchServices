/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SearchFormComponent, SearchKioskComponent } from './index';


@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: SearchFormComponent, pathMatch: 'full' },
      { path: 'quiosco', component: SearchKioskComponent }
    ])
  ],
  exports: [RouterModule]
})
export class SearchServicesRoutingModule { }
