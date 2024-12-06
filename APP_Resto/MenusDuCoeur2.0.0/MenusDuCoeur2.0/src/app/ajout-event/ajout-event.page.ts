import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
@Component({
  selector: 'app-ajout-event',
  templateUrl: './ajout-event.page.html',
  styleUrls: ['./ajout-event.page.scss'],
  standalone: false
})
export class AjoutEventPage implements OnInit {
  label_event: string = '';
  nbBenevoleRequis!: number;
  nb_repas_prevu!: number;
  latitude_event: string = '';
  cp_event: string = '';
  ville_event: string = '';
  rue_event: string = '';
  date_event: string = '';
  heure_debut_event: string = '';
  heure_fin_event: string = '';
  commentaire: string = '';
  date_annulation: string = '';
  id_util!: any; // L'ID de l'utilisateur connecté
  longitude_event: string = '';

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }
  ngOnInit() {
    // Cette méthode est appelée à l'initialisation du composant
    console.log('AjoutEventPage initialized');
    this.id_util = this.authService.getUserId();  // Assure-toi que la méthode getUserId() retourne l'ID de l'utilisateur connecté
    console.log('Utilisateur ID:', this.id_util)


  }
  async getCityDetails() {
    const cityInput = this.ville_event.trim();
    const rueInput = this.rue_event.trim();
    if (cityInput.length < 3) {
      this.resetCoordinates();
      return;
    }

    try {
      const apiUrl = `https://api-adresse.data.gouv.fr/search/?q=${rueInput}+${cityInput}&limit=1`;
      const response = await axios.get(apiUrl);
      if (response.data && response.data.features.length > 0) {
        const city = response.data.features[0].properties;
        const coordinates = response.data.features[0].geometry.coordinates;
        this.cp_event = city.postcode || '--';
        this.latitude_event = coordinates[1] || '--';
        this.longitude_event = coordinates[0] || '--';
      } else {
        this.resetCoordinates();
      }
    } catch (error) {
      console.error('Erreur API:', error);
      this.resetCoordinates();
    }
  }

  resetCoordinates() {
    this.cp_event = '--';
    this.latitude_event = '--';
    this.longitude_event = '--';
  }
  onSubmit() {
    const eventData = {
      label_event: this.label_event,
      nbBenevoleRequis: this.nbBenevoleRequis,
      nb_repas_prevu: this.nb_repas_prevu,
      latitude_event: this.latitude_event,
      cp_event: this.cp_event,
      ville_event: this.ville_event,
      rue_event: this.rue_event,
      date_event: this.date_event,
      heure_debut_event: this.heure_debut_event,
      heure_fin_event: this.heure_fin_event,
      commentaire: this.commentaire,
      date_annulation: this.date_annulation,
      id_util: this.id_util,
      longitude_event: this.longitude_event
    };

    // Appel à l'API pour ajouter l'événement
    this.http.post('http://localhost:3001/api/ajout-event', eventData)
      .subscribe(
        (response: any) => {
          if (response.success) {
            // Redirection après ajout réussi
            this.router.navigate(['/home']);
          } else {
            alert(response.message);
          }
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de l\'événement:', error);
        }
      );
  }
  goBack() {
    this.router.navigate(['/home']);
  }
}
