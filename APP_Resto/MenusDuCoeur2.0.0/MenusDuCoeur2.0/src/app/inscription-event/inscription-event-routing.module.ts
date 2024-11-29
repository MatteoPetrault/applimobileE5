import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InscriptionEventPage } from './inscription-event.page';

const routes: Routes = [
  {
    path: '',
    component: InscriptionEventPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InscriptionEventPageRoutingModule {}
