import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AjoutEventPageRoutingModule } from './ajout-event-routing.module';

import { AjoutEventPage } from './ajout-event.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AjoutEventPageRoutingModule
  ],
  declarations: [AjoutEventPage]
})
export class AjoutEventPageModule {}
