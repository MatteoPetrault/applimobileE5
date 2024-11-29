import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InscriptionEventPageRoutingModule } from './inscription-event-routing.module';
import { Routes, RouterModule } from '@angular/router';
import { InscriptionEventPage } from './inscription-event.page';
const routes: Routes = [
  {
    path: '',
    component: InscriptionEventPage
  }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InscriptionEventPageRoutingModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: [InscriptionEventPage]
})
export class InscriptionEventPageModule { }
