import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditReviewPageRoutingModule } from './edit-review-routing.module';

import { EditReviewPage } from './edit-review.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditReviewPageRoutingModule
  ],
  declarations: [EditReviewPage]
})
export class EditReviewPageModule {}
