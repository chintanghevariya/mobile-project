import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddRestaurantPageRoutingModule } from './add-restaurant-routing.module';

import { AddRestaurantPage } from './add-restaurant.page';
import { SelectLocationPageModule } from '../select-location/select-location.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddRestaurantPageRoutingModule,    
    SelectLocationPageModule
  ],
  declarations: [AddRestaurantPage]
})
export class AddRestaurantPageModule { }
