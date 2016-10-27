import { RouterConfig } from '@angular/router';

import {  SearchForm } from './index';

export const SearchRoutes: RouterConfig = [
  {
    path: '',
    redirectTo: 'buscar',
    pathMatch: 'full'
  },

   {
     path: 'buscar',
     component: SearchForm
   }
];
