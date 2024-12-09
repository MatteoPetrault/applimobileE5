import { Component, OnInit } from '@angular/core';
//import { EventService } from '../services/event.service';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-liste-event',
    templateUrl: './liste-event.page.html',
    styleUrls: ['./liste-event.page.scss'],
    standalone: false
})
export class ListeEventPage implements OnInit {
  events: any[] = [];
  isUserRegistered: boolean = false;
  inscriptionMessage: string = '';
  eventIdToUnsubscribe: number | null = null; // Variable pour stocker l'ID de l'événement à désinscrire

  constructor(
    //private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private authService: AuthService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    const userId = this.authService.getUserId();
    if (userId) {
      this.fetchEvents(userId); // Passez userId à fetchEvents
    } else {
      console.error('Aucun utilisateur connecté trouvé');
    }
  }

  fetchEvents(userId: string) {
    const url = `http://localhost:3001/api/evenement_inscrit/${userId}`;
    this.http.get(url).subscribe(
      (data: any) => {
        this.events = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des événements', error);
      }
    );
  }

  async presentUnsubscribeConfirmation(eventId: number) {
    this.eventIdToUnsubscribe = eventId; // Enregistrer l'ID de l'événement à désinscrire

    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: 'Êtes-vous sûr de vouloir vous désinscrire de cet événement ?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          handler: () => {
            console.log('Désinscription annulée');
          },
        },
        {
          text: 'Confirmer',
          handler: () => {
            this.unsubscribe();
          },
        },
      ],
    });
    await alert.present();
  }

  unsubscribe() {
    const userId = this.authService.getUserId();
    if (userId && this.eventIdToUnsubscribe) {
      this.http.post('http://localhost:3001/api/desinscrire', { userId, eventId: this.eventIdToUnsubscribe }).subscribe(
        (data: any) => {
          this.removeEventFromList(this.eventIdToUnsubscribe); // Supprimer l'événement de la liste locale
          this.inscriptionMessage = `Vous vous êtes désinscrit de l'événement : ${this.eventIdToUnsubscribe}. Vous allez recevoir un e-mail pour confirmation.`;
        },
        (error) => {
          console.error('Erreur lors de la désinscription', error);
        }
      );
    }
  }

  removeEventFromList(eventIdToUnsubscribe: any) {
    this.events = this.events.filter(event => event.id !== eventIdToUnsubscribe);
  }

  goBack() {
    const userId = this.authService.getUserId();
    if (userId) {
      this.router.navigate(['/home'], { queryParams: { id: userId } });
    } else {
      console.error('Utilisateur non connecté');
    }
  }
}
