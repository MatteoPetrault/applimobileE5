import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // Vérifie si l'utilisateur est connecté
    const token = localStorage.getItem('userToken');
    if (!token) {
      // Si pas connecté, redirige vers login
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
