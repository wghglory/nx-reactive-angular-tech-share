import { Route } from '@angular/router';

import { HeroListImperativeComponent } from './pages/hero-list-imperative/hero-list-imperative.component';
import { HeroListReactiveComponent } from './pages/hero-list-reactive/hero-list-reactive.component';

export const heroRoutes: Route[] = [
  {
    path: 'reactive',
    component: HeroListReactiveComponent,
  },
  {
    path: 'imperative',
    component: HeroListImperativeComponent,
  },
];
