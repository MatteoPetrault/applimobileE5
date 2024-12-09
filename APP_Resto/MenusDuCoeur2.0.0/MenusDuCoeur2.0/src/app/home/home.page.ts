import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { MapService } from '../services/map.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AlertController } from '@ionic/angular';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
    standalone: false
})
export class HomePage implements OnInit {
  isTextVisible: boolean = true; // Contrôle de la visibilité du texte
  id_role: any; // Identifiant du rôle de l'utilisateur
  activePopup: L.Popup | null = null; // Popup actuellement ouvert
  events: any[] = [];  // Liste complète des événements
  filteredEvents: any[] = [];  // Événements filtrés
  map: L.Map | null = null; // Carte Leaflet

  constructor(
    private mapService: MapService,
    private alertController: AlertController,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    // Récupération du rôle utilisateur
    this.id_role = this.authService.getUserRole();
    console.log('ID rôle:', this.id_role);

    // Initialisation de la carte centrée sur la France
    this.map = L.map('map', {
      dragging: true,
      scrollWheelZoom: true,
    }).setView([46.603354, 1.888334], 6);

    // Ajout des tuiles OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    // Chargement des événements avec des marqueurs colorés
    this.mapService.getEventsWithColors().subscribe(events => {
      this.events = events;
      this.filteredEvents = events;  // Initialement, on affiche tous les événements
      this.updateMap();  // Mettre à jour la carte avec tous les événements
    });
  }

  /**
   * Ajoute un marqueur à la carte pour un événement donné.
   * @param event Données de l'événement
   */
  addEventMarker(event: any) {
    const latitude = parseFloat(event.latitude_event);
    const longitude = parseFloat(event.longitude_event);

    if (!isNaN(latitude) && !isNaN(longitude)) {
      const color = event.color || 'gray';

      // Création du marqueur
      const marker = L.marker([latitude, longitude], {
        icon: L.divIcon({
          className: 'custom-icon',
          html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%;"></div>`,
        }),
      }).addTo(this.map!);

      // Gérer le clic sur le marqueur
      marker.on('click', () => {
        this.handleMarkerClick(marker, event);
      });
    } else {
      console.error('Latitude ou Longitude invalides pour l\'événement:', event);
    }
  }

  /**
   * Met à jour la carte avec les événements filtrés.
   */
  updateMap() {
    // Réinitialiser les marqueurs existants
    if (this.map) {
      this.map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          this.map!.removeLayer(layer);
        }
      });

      // Ajouter les marqueurs des événements filtrés
      this.filteredEvents.forEach(event => {
        this.addEventMarker(event);
      });
    }
  }


  /**
   * Filtrer les événements en fonction de la couleur sélectionnée.
   * @param color Couleur de l'événement à filtrer
   */
  filterEvents(color: string) {
    if (color) {
      this.filteredEvents = this.events.filter(event => event.color === color);
    } else {
      this.filteredEvents = this.events;  // Si aucune couleur n'est sélectionnée, afficher tous les événements
    }
    this.updateMap(); // Mettre à jour la carte avec les événements filtrés
  }

  resetFilter() {
    this.filteredEvents = this.events;  // Réinitialise les événements filtrés pour afficher tout
    this.updateMap();
  }


  /**
   * Gère le clic sur un marqueur.
   * @param marker Marqueur cliqué
   * @param event Données de l'événement
   */
  handleMarkerClick(marker: L.Marker, event: any) {
    // Fermer le popup actif
    if (this.activePopup) {
      this.activePopup.removeFrom(this.map!);
    }

    // Contenu du popup avec les détails de l'événement
    let popupContent = `
      <b>${event.label_event}</b><br>
      Date: ${new Date(event.date_event).toLocaleDateString()}<br>
      Bénévoles requis: ${event.nbBenevoleRequis}<br>
      Bénévoles inscrits: ${event.nbBenevoleInscrit}<br>
      Bénévoles manquants: ${event.nbBenevoleManquant}<br>
    `;

    popupContent += (event.color === 'red')
      ? `<strong>Il manque du monde, venez vous inscrire !</strong><br>`
      : `<strong>Venez vous inscrire !</strong><br>`;

    popupContent += `
      <div style="text-align: center;">
        <div style="display: flex; justify-content: center; gap: 10px;">
          <button id="inscrireBtn" style="padding: 5px 10px; background-color: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer; flex: 1;">S'inscrire</button>
    `;

    if (this.id_role === 1 || this.id_role === 2) {
      popupContent += `
          <button id="modifierBtn" style="padding: 5px 10px; background-color: #28a745; color: white; border: none; border-radius: 5px; cursor: pointer; flex: 1;">Modifier</button>
        `;
    }

    popupContent += `</div></div>`;

    // Création du popup
    const popup = L.popup()
      .setLatLng(marker.getLatLng())
      .setContent(popupContent)
      .openOn(this.map!);

    this.activePopup = popup;

    // Attacher un gestionnaire au bouton "S'inscrire"
    setTimeout(() => {
      const inscrireBtn = document.getElementById('inscrireBtn');
      if (inscrireBtn) {
        inscrireBtn.onclick = () => this.navigateToInscription(event.id_event);
      }
      const modifierBtn = document.getElementById('modifierBtn');
      if (modifierBtn) {
        modifierBtn.onclick = () => this.navigateToModification(event.id_event);
      }
    }, 100);
  }

  /**
   * Redirige l'utilisateur vers la page d'inscription pour l'événement donné.
   * @param eventId ID de l'événement
   */
  navigateToInscription(eventId: number) {
    const userId = this.authService.getUserId();
    console.log('Utilisateur ID:', userId);

    if (userId) {
      this.router.navigate([`/inscription-event/${eventId}`], {
        queryParams: { eventId, userId },
      });
    } else {
      console.log('Utilisateur non connecté');
      this.router.navigate(['/login']);
    }
  }

  navigateToModification(eventId: number) {
    const userId = this.authService.getUserId();
    console.log('Utilisateur ID:', userId);

    if (userId) {
      this.router.navigate([`/modifier-event/${eventId}`], {
        queryParams: { eventId, userId },
      });
    } else {
      console.log('Utilisateur non connecté');
      this.router.navigate(['/login']);
    }
  }

  /**
   * Bascule la visibilité du texte.
   */
  toggleText() {
    this.isTextVisible = !this.isTextVisible;
  }


  /**
   * Déconnecte l'utilisateur avec confirmation.
   */
  logout(): void {
    this.alertController
      .create({
        header: 'Confirmer la déconnexion',
        message: 'Voulez-vous vraiment vous déconnecter ?',
        buttons: [
          {
            text: 'Annuler',
            role: 'cancel',
            handler: () => {
              console.log('Annulation de la déconnexion');
            },
          },
          {
            text: 'Confirmer',
            handler: () => {
              console.log('Déconnexion confirmée');
              this.authService.logout();
              this.router.navigate(['/login']);
            },
          },
        ],
      })
      .then(alert => alert.present());
  }
}
