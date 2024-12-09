import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  // Importer ReactiveFormsModule ici

import { IonicModule } from '@ionic/angular';

import { BenevoleInscriptionPageRoutingModule } from './benevole-inscription-routing.module';

import { BenevoleInscriptionPage } from './benevole-inscription.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    BenevoleInscriptionPageRoutingModule
  ],
  declarations: [BenevoleInscriptionPage]
})
export class BenevoleInscriptionPageModule {}
