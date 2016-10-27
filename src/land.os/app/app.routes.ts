import { provideRouter, RouterConfig } from '@angular/router';

import { SearchRoutes } from './search/search.routes';

const routes: RouterConfig = [
  ...SearchRoutes,

];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes),
];
