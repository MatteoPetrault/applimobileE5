import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListeEventPage } from './liste-event.page';

const routes: Routes = [
  {
    path: '',
    component: ListeEventPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListeEventPageRoutingModule {}
