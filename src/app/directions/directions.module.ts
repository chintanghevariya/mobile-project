import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DirectionsPageRoutingModule } from './directions-routing.module';

import { DirectionsPage } from './directions.page';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GoogleMapsModule,
    DirectionsPageRoutingModule
  ],
  declarations: [DirectionsPage]
})
export class DirectionsPageModule {}
