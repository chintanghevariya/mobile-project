import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then( m => m.ListPageModule)
  },
  {
    path: 'add-restaurant',
    loadChildren: () => import('./add-restaurant/add-restaurant.module').then( m => m.AddRestaurantPageModule)
  },
  {
    path: 'select-location',
    loadChildren: () => import('./select-location/select-location.module').then( m => m.SelectLocationPageModule)
  },
  {
    path: 'view-restaurant',
    loadChildren: () => import('./view-restaurant/view-restaurant.module').then( m => m.ViewRestaurantPageModule)
  },
  {
    path: 'directions/:lat/:lng',
    loadChildren: () => import('./directions/directions.module').then( m => m.DirectionsPageModule)
  },
  {
    path: 'edit-restuarant',
    loadChildren: () => import('./edit-restuarant/edit-restuarant.module').then( m => m.EditRestuarantPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'edit-review/:reviewId/:comment/:rating/:restaurantId',
    loadChildren: () => import('./edit-review/edit-review.module').then( m => m.EditReviewPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
