import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupprimerEventPage } from './supprimer-event.page';

const routes: Routes = [
  {
    path: '',
    component: SupprimerEventPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupprimerEventPageRoutingModule {}
