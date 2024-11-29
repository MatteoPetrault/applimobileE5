import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrganisateurInscriptionPageRoutingModule } from './organisateur-inscription-routing.module';

import { OrganisateurInscriptionPage } from './organisateur-inscription.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    OrganisateurInscriptionPageRoutingModule
  ],
  declarations: [OrganisateurInscriptionPage]
})
export class OrganisateurInscriptionPageModule {}
