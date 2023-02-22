import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { WelcomeComponent } from '@rx/core/ui';
import { productRoutes } from '@rx/feature/product';

const routes: Route[] = [
  {
    path: '',
    component: WelcomeComponent,
  },
  {
    path: 'heroes',
    loadChildren: () => import('@rx/feature/hero').then(m => m.HeroModule),
  },
  {
    path: 'products',
    children: productRoutes,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
