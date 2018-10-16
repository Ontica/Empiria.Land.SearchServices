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
