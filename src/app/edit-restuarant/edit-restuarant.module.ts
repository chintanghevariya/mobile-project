import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditRestuarantPageRoutingModule } from './edit-restuarant-routing.module';
import { GoogleMapsModule } from '@angular/google-maps';
import { EditRestuarantPage } from './edit-restuarant.page';
import { SelectLocationPageModule } from '../select-location/select-location.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditRestuarantPageRoutingModule,
    GoogleMapsModule,
    SelectLocationPageModule
  ],
  declarations: [EditRestuarantPage]
})
export class EditRestuarantPageModule {}
