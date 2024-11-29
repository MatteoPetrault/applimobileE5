import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BenevoleInscriptionPage } from './benevole-inscription.page';

const routes: Routes = [
  {
    path: '',
    component: BenevoleInscriptionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BenevoleInscriptionPageRoutingModule {}
