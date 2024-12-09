import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';  // Importation d'HttpClient

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3001/login'; // URL de ton API Node.js pour la connexion
  private updateLoginUrl = 'http://localhost:3001/api/modif/dateDerConnexion'; // URL de l'API pour mettre à jour la date de dernière connexion
  private userId: string = ''; // ID de l'utilisateur connecté
  private id_role: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  // Appel à l'API pour mettre à jour la date de dernière connexion
  updateLastLogin(id_util: number): Observable<any> {
    return this.http.post<any>(this.updateLoginUrl, { id_util })
      .pipe(
        catchError(error => {
          console.error('Erreur lors de la mise à jour de la date de dernière connexion:', error);
          return throwError(() => new Error('Erreur de mise à jour de la date de dernière connexion'));
        })
      );
  }

  // Méthode de connexion
  async login(email: string, password: string): Promise<any> {
    const body = { email, password }; // Préparer les données

    console.log('Données envoyées à l\'API :', body); // Debug

    try {
      const response = await axios.post(this.apiUrl, body); // Envoi des données à l'API
      console.log('Réponse de l\'API :', response.data);

      if (response.data && response.data.id) {
        this.userId = response.data.id; // Stocker l'ID de l'utilisateur
        this.id_role = response.data.role;

        // Stockage des informations dans le localStorage
        localStorage.setItem('userToken', response.data.token); 
        localStorage.setItem('userId', response.data.id); 
        localStorage.setItem('id_role', response.data.role); 

        // Appel de l'API pour mettre à jour la date de dernière connexion
        this.updateLastLogin(response.data.id).subscribe({
          next: () => {
            console.log('Date de dernière connexion mise à jour avec succès');
          },
          error: (error) => {
            console.error('Erreur lors de la mise à jour de la date de dernière connexion', error);
          }
        });
      }

      return response.data; // Renvoie la réponse de l'API
    } catch (error: any) {
      console.error('Erreur lors de la connexion :', error);
      throw new Error(error.response?.data?.message || 'Erreur lors de la connexion');
    }
  }

  // Méthode pour obtenir le rôle de l'utilisateur
  getUserRole(): string {
    return this.id_role;  // Retourner le rôle de l'utilisateur
  }

  // Méthode pour obtenir l'ID de l'utilisateur
  getUserId(): string {
    return this.userId;
  }

  // Méthode de déconnexion
  logout(): void {
    // Nettoyer les données de session
    localStorage.removeItem('userToken');
    localStorage.removeItem('userId');
    this.userId = ''; // Réinitialiser l'ID utilisateur

    // Rediriger vers la page de connexion
    this.router.navigate(['/login']);
  }
}
