import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchForm } from './search.form';
import { SearchServicesRoutingModule } from './search.routes';

import { SharedModule } from './../shared/shared.module';
import { DataService } from './../shared/services/data.service';

@NgModule({
  imports: [CommonModule, SearchServicesRoutingModule, SharedModule],
  declarations: [SearchForm],
  exports: [SearchForm],
  providers: [DataService]
})
export class LandSearchServicesModule { }
