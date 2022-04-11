import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewRestaurantPageRoutingModule } from './view-restaurant-routing.module';

import { ViewRestaurantPage } from './view-restaurant.page';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewRestaurantPageRoutingModule,
    GoogleMapsModule
  ],
  declarations: [ViewRestaurantPage]
})
export class ViewRestaurantPageModule {}
