import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { AppComponent } from './app.component';
import { APP_CART_LIST, APP_CATEGORY_LIST, APP_PRODUCT_LIST } from './constants/app-route.constant';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: APP_PRODUCT_LIST
  },
  {
    path: APP_PRODUCT_LIST,
    loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)
  },
  {
    path: APP_CATEGORY_LIST,
    loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule)
  },
  {
    path: APP_CART_LIST,
    loadChildren: () => import('./carts/carts.module').then(m => m.CartsModule)
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
