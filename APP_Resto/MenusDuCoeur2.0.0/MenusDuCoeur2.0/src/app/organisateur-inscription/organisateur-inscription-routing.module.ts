import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrganisateurInscriptionPage } from './organisateur-inscription.page';

const routes: Routes = [
  {
    path: '',
    component: OrganisateurInscriptionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganisateurInscriptionPageRoutingModule {}
