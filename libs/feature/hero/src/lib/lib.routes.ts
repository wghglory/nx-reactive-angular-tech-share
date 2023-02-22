import { Route } from '@angular/router';

import { HeroListComponent } from './pages/hero-list/hero-list.component';

export const heroRoutes: Route[] = [
  {
    path: '',
    component: HeroListComponent,
  },
];
