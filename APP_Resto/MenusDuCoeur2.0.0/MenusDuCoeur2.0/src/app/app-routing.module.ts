import { NgModule } from '@angular/core';
import { AuthGuard } from './auth.guard';

import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule), canActivate: [AuthGuard]
  }
  ,
  {
    path: '',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'inscription-event/:id',
    loadChildren: () => import('./inscription-event/inscription-event.module').then(m => m.InscriptionEventPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'liste-event',
    loadChildren: () => import('./liste-event/liste-event.module').then(m => m.ListeEventPageModule)
  },
  {
    path: 'inscription',
    loadChildren: () => import('./inscription/inscription.module').then(m => m.InscriptionPageModule)
  },
  {
    path: 'organisateur-inscription',
    loadChildren: () => import('./organisateur-inscription/organisateur-inscription.module').then(m => m.OrganisateurInscriptionPageModule)
  },
  {
    path: 'benevole-inscription',
    loadChildren: () => import('./benevole-inscription/benevole-inscription.module').then(m => m.BenevoleInscriptionPageModule)
  },
  {
    path: 'demande',
    loadChildren: () => import('./demande/demande.module').then(m => m.DemandePageModule)
  },
  {
    path: 'ajout-event',
    loadChildren: () => import('./ajout-event/ajout-event.module').then(m => m.AjoutEventPageModule)
  },
  {
    path: 'supprimer-event',
    loadChildren: () => import('./supprimer-event/supprimer-event.module').then(m => m.SupprimerEventPageModule)
  },
  {
    path: 'modifier-event/:id',
    loadChildren: () => import('./modifier-event/modifier-event.module').then(m => m.ModifierEventPageModule)
  },
  {
    path: 'ajout-event',
    loadChildren: () => import('./ajout-event/ajout-event.module').then( m => m.AjoutEventPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
