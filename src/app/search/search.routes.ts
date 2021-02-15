/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SearchFormComponent, SearchKioskComponent } from './index';

const routes: Routes = [
  { path: '', component: SearchFormComponent, pathMatch: 'full' },
  { path: 'consultas', component: SearchFormComponent },
  { path: 'quiosco', component: SearchKioskComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchServicesRoutingModule { }
