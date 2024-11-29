import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-inscription-event',
    templateUrl: './inscription-event.page.html',
    styleUrls: ['./inscription-event.page.scss'],
    standalone: false
})
export class InscriptionEventPage implements OnInit {
  eventId!: number;
  eventDetails: any;
  isUserRegistered: boolean = false;
  inscriptionMessage: string = '';
  message: string = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private alertController: AlertController,
    private authService: AuthService,
    private navController: NavController
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.eventId = +id;
        this.getEventDetails();
        this.checkUserRegistration();
      } else {
        console.error('Aucun ID d\'événement trouvé');
      }
    });
  }

  // Récupérer les détails de l'événement
  getEventDetails() {
    this.http.get(`http://localhost:3001/api/evenement/${this.eventId}`).subscribe(
      (data: any) => {
        this.eventDetails = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des détails de l\'événement', error);
      }
    );
  }

  // Vérifier si l'utilisateur est déjà inscrit
  checkUserRegistration() {
    const userId = this.authService.getUserId();
    if (userId) {
      this.http.get(`http://localhost:3001/api/check-inscription/${userId}/${this.eventId}`).subscribe(
        (data: any) => {
          if (data.isRegistered) {
            this.inscriptionMessage = 'Vous êtes déjà inscrit à l\'événement !';
            this.isUserRegistered = true;
          }
        },
        (error) => {
          console.error('Erreur lors de la vérification de l\'inscription', error);
        }
      );
    }
  }

  // Inscrire l'utilisateur
  inscrire() {
    const userId = this.authService.getUserId();
    if (userId) {
      this.http.post('http://localhost:3001/api/inscrire', { userId, eventId: this.eventId }).subscribe(
        (data: any) => {
          this.inscriptionMessage = 'Vous êtes maintenant inscrit à l\'événement !';
          this.isUserRegistered = true;
        },
        (error) => {
          console.error('Erreur lors de l\'inscription', error);
        }
      );
    }
  }

  // Désinscrire l'utilisateur
  unsubscribe() {
    const userId = this.authService.getUserId();
    if (userId) {
      this.http.post('http://localhost:3001/api/desinscrire', { userId, eventId: this.eventId }).subscribe(
        (data: any) => {
          this.inscriptionMessage = 'Vous vous êtes désinscrit de l\'événement.';
          this.isUserRegistered = false;
        },
        (error) => {
          console.error('Erreur lors de la désinscription', error);
        }
      );
    }
  }

  // Afficher la confirmation d'inscription
  async presentConfirmation() {
    const alert = await this.alertController.create({
      header: 'Confirmer l\'inscription',
      message: 'Voulez-vous vraiment vous inscrire à cet événement ?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          handler: () => {
            console.log('Annulation de l\'inscription');
          },
        },
        {
          text: 'Confirmer',
          handler: () => {
            console.log('Inscription confirmée');
            this.inscrire();
          },
        },
      ],
    });
    await alert.present();
  }

  // Afficher la confirmation de désinscription
  async presentUnsubscribeConfirmation() {
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

  // Retourner à la page précédente
  goBack() {
    const userId = this.authService.getUserId();
    if (userId) {
      this.router.navigate(['/home'], { queryParams: { id: userId } });
    } else {
      console.error('Utilisateur non connecté');
    }
  }
}
