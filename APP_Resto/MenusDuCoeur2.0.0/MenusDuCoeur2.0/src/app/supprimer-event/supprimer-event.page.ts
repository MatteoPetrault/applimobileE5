import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
    selector: 'app-supprimer-event',
    templateUrl: './supprimer-event.page.html',
    styleUrls: ['./supprimer-event.page.scss'],
    standalone: false
})
export class SupprimerEventPage implements OnInit {
  events: any[] = [];

  constructor(private http: HttpClient, private alertCtrl: AlertController, private router: Router) { }

  ngOnInit() {
    this.chargerEvents();
  }

  chargerEvents() {
    this.http.get('http://localhost:3001/api/evenements/suppression').subscribe(
      (data: any) => {
        // Assurez-vous d'accéder à 'data.data' pour récupérer la liste des événements
        if (data.success) {
          this.events = data.data; // Récupère les événements
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération des événements', error);
      }
    );
  }


  async supprimerEvent(id: number) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmation',
      message: 'Êtes-vous sûr de vouloir supprimer cet événement ?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
        },
        {
          text: 'Supprimer',
          handler: () => {
            // Remplacer :id par l'ID de l'événement à supprimer
            this.http.delete(`http://localhost:3001/api/evenements/suppression/${id}`).subscribe(
              () => {
                // Retirer l'événement supprimé de la liste
                this.events = this.events.filter((event) => event.id_event !== id);
              },
              (error) => {
                console.error('Erreur lors de la suppression de l\'événement', error);
              }
            );
          },
        },
      ],
    });

    await alert.present();
  }
  goBack() {
    this.router.navigate(['/home']);
  }
}
