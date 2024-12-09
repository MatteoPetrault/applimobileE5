import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
    selector: 'app-demande',
    templateUrl: './demande.page.html',
    styleUrls: ['./demande.page.scss'],
    standalone: false
})
export class DemandePage implements OnInit {
  inscriptions: any[] = []; // Liste des inscriptions en attente
  inscriptionMessage: string = ''; // Message de feedback utilisateur

  constructor(
    private http: HttpClient,
    private alertController: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
    // Charger les inscriptions dès l'initialisation
    this.fetchInscription();
  }

  /**
   * Récupère la liste des inscriptions en attente depuis l'API
   */
  fetchInscription() {
    const url = 'http://localhost:3001/api/inscription-attente';
    this.http.get<any>(url).subscribe(
      (response) => {
        if (response.success) {
          this.inscriptions = response.data; // Charger les données dans le tableau
        } else {
          console.error('Erreur lors de la récupération des inscriptions', response.message);
        }
      },
      (error) => {
        console.error('Erreur API lors de la récupération des inscriptions :', error);
      }
    );
  }

  /**
   * Accepte une inscription en attente
   * @param inscriptionId ID de l'inscription à accepter
   */
  acceptInscription(inscriptionId: number) {
    const url = 'http://localhost:3001/api/inscription-attente/accepter';
    this.http.post(url, { inscriptionId }).subscribe(
      (response: any) => {
        console.log('Inscription acceptée :', response.message);
        this.fetchInscription(); // Mettre à jour la liste
      },
      (error) => {
        console.error('Erreur lors de l\'acceptation de l\'inscription :', error);
      }
    );
  }
  async presentAccepter(inscriptionId: number) {
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: 'Êtes-vous sûr de vouloir accepter cette inscription ?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          handler: () => {
            console.log('Refus annulé');
          },
        },
        {
          text: 'Confirmer',
          handler: () => {
            this.acceptInscription(inscriptionId);
          },
        },
      ],
    });
    await alert.present();
  }

  /**
   * Affiche une boîte de dialogue de confirmation pour refuser une inscription
   * @param inscriptionId ID de l'inscription à refuser
   */
  async presentUnsubscribeConfirmation(inscriptionId: number) {
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: 'Êtes-vous sûr de vouloir refuser cette inscription ?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          handler: () => {
            console.log('Refus annulé');
          },
        },
        {
          text: 'Confirmer',
          handler: () => {
            this.refuseInscription(inscriptionId);
          },
        },
      ],
    });
    await alert.present();
  }

  /**
   * Refuse une inscription en attente
   * @param inscriptionId ID de l'inscription à refuser
   */
  refuseInscription(inscriptionId: number) {
    const url = 'http://localhost:3001/api/inscription-attente/refuser';
    this.http.post(url, { inscriptionId }).subscribe(
      (response: any) => {
        console.log('Inscription refusée :', response.message);
        this.fetchInscription(); // Mettre à jour la liste
      },
      (error) => {
        console.error('Erreur lors du refus de l\'inscription :', error);
      }
    );
  }

  /**
   * Retourne à la page précédente
   */
  goBack() {
    this.router.navigate(['/home']);
  }
}
