import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListeEventPageRoutingModule } from './liste-event-routing.module';

import { ListeEventPage } from './liste-event.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListeEventPageRoutingModule
  ],
  declarations: [ListeEventPage]
})
export class ListeEventPageModule {}
