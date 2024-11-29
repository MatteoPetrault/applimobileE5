import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3001/login'; // URL de ton API Node.js
  private userId: string = ''; // ID de l'utilisateur connecté
  private inscriptionId: string = ''; // ID de l'utilisateur connecté
  private id_role: string = '';
  constructor(private router: Router) {}

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
        //this.inscriptionId = response.data.id_users;
        localStorage.setItem('userToken', response.data.token); // Stocker le token
        localStorage.setItem('userId', response.data.id); // Stocker l'ID utilisateur
        localStorage.setItem('id_role', response.data.role); 
        //localStorage.setItem('inscriptionId', response.data.id_users); 
        
      }

      return response.data; // Renvoie la réponse de l'API
    } catch (error: any) {
      console.error('Erreur lors de la connexion :', error);
      throw new Error(error.response?.data?.message || 'Erreur lors de la connexion');
    }
  }
  getUserRole(): string {
    return this.id_role;  // Retourner le rôle de l'utilisateur
  }


  // Méthode pour obtenir l'ID de l'utilisateur
  getUserId(): string {
    return this.userId;
  }
  /*getUserArefuser(): string{
    return this.inscriptionId ; 
  }*/
  


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
