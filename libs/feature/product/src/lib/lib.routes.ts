import { Route } from '@angular/router';

import { ProductListComponent } from './pages/product-list/product-list.component';

export const productRoutes: Route[] = [
  { path: '', component: ProductListComponent },
  {
    path: ':id',
    loadComponent: () => import('./pages/product-detail/product-detail.component').then(m => m.ProductDetailComponent),
  },
  {
    path: '@/add',
    loadComponent: () => import('./pages/product-add/product-add.component').then(m => m.ProductAddComponent),
  },
];
