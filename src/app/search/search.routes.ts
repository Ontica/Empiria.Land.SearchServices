/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SearchForm, SearchKioskForm } from './index';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: SearchForm, pathMatch: 'full' },
      { path: 'quiosco', component: SearchKioskForm }
    ])
  ],
  exports: [RouterModule]
})
export class SearchServicesRoutingModule { }
