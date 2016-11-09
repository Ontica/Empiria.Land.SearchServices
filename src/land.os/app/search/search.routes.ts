import { RouterConfig } from '@angular/router';

import {  SearchForm } from './index';

export const SearchRoutes: RouterConfig = [
  {
    path: '',
    component: SearchForm,
    pathMatch: 'full'
  }
];
