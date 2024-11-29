import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifierEventPage } from './modifier-event.page';

const routes: Routes = [
  {
    path: '',
    component: ModifierEventPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifierEventPageRoutingModule {}
