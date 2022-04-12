import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditRestuarantPage } from './edit-restuarant.page';

const routes: Routes = [
  {
    path: '',
    component: EditRestuarantPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditRestuarantPageRoutingModule {}
