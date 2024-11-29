import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
    standalone: false
})
export class LoginPage {
  email: string = ''; // Email de l'utilisateur
  password: string = ''; // Mot de passe de l'utilisateur
  message: string = ''; // Message d'information ou d'erreur

  constructor(private router: Router, private authService: AuthService) { }

  async login() {
    try {
      // Appel de la méthode login du service AuthService
      const response = await this.authService.login(this.email, this.password);

      if (response && response.id) {
        // Si l'ID est valide, rediriger vers la page home avec l'ID en queryParams
        console.log('Utilisateur connecté, ID:', response.id);
        this.router.navigate(['/home'], {
          queryParams: { userId: response.id },
        });
      } else {
        this.message = 'Connexion échouée. Vérifiez vos informations.';
      }
    } catch (error: any) {
      // Si la connexion échoue, afficher un message d'erreur
      console.error('Erreur de connexion :', error.message);
      this.message = error.message || 'Erreur lors de la connexion.';
    }
  }
}
