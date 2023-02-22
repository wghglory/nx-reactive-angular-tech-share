import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { productRoutes } from '@rx/feature/product';
import { WelcomeComponent } from '@rx/shared/ui';

const routes: Route[] = [
  {
    path: '',
    component: WelcomeComponent,
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
