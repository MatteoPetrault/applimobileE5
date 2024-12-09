import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SupprimerEventPageRoutingModule } from './supprimer-event-routing.module';

import { SupprimerEventPage } from './supprimer-event.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SupprimerEventPageRoutingModule
  ],
  declarations: [SupprimerEventPage]
})
export class SupprimerEventPageModule {}
