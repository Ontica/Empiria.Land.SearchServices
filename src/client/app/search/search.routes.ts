import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SearchForm } from './search.form';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: SearchForm, pathMatch: 'full' }
    ])
  ],
  exports: [RouterModule]
})
export class SearchServicesRoutingModule { }
