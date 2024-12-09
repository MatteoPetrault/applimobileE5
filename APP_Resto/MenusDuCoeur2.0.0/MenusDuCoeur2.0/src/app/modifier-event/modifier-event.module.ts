import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';
import { ModifierEventPageRoutingModule } from './modifier-event-routing.module';

import { ModifierEventPage } from './modifier-event.page';
const routes: Routes = [
  {
    path: '',
    component: ModifierEventPage
  }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModifierEventPageRoutingModule,
    RouterModule.forChild(routes)

  ],
  exports: [RouterModule],
  declarations: [ModifierEventPage]
})
export class ModifierEventPageModule { }
