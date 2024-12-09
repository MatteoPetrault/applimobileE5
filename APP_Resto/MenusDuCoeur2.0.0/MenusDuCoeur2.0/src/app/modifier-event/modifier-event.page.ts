import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-modifier-event',
    templateUrl: './modifier-event.page.html',
    styleUrls: ['./modifier-event.page.scss'],
    standalone: false
})
export class ModifierEventPage implements OnInit {
  eventId!: number;
  eventDetails: any;
  isEditing: string | null = null;
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
      console.log('ID récupéré dans le paramMap:', id); // Log ID ici
      if (id) {
        this.eventId = +id;
        console.log('ID converti:', this.eventId); // Log de l'ID converti
        this.getEventDetails();
      } else {
        console.error('Aucun ID d\'événement trouvé');
      }
    });
  }


  getEventDetails() {
    console.log('Récupération des détails de l\'événement avec l\'ID:', this.eventId); // Log de l'ID
    this.http.get(`http://localhost:3001/api/evenement/${this.eventId}`).subscribe(
      (data: any) => {
        console.log('Données de l\'API:', data); // Ajoute cette ligne pour inspecter la réponse
        this.eventDetails = data;

        // Assure-toi que la date existe et est bien formatée
        if (this.eventDetails && this.eventDetails.date) {
          this.eventDetails.date = new Date(this.eventDetails.date).toISOString().split('T')[0]; // Formater la date si nécessaire
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération des détails de l\'événement:', error);
      }
    );

  }



  activerModification(field: string) {
    this.isEditing = field; // Indiquer quel champ est en édition
  }

  saveModification(field: string) {
    this.isEditing = null; // Fermer le mode édition

    // Mettre à jour l'événement uniquement pour le champ modifié
    if (field === 'label') {
      this.eventDetails.label = this.eventDetails.label;
    }
    if (field === 'ville') {
      this.eventDetails.ville = this.eventDetails.ville;
    }
    if (field === 'rue') {
      this.eventDetails.rue = this.eventDetails.rue;
    }
    if (field === 'cp') {
      this.eventDetails.cp = this.eventDetails.cp;
    }
    if (field === 'date') {
      this.eventDetails.date = this.eventDetails.date;
    }
    if (field === 'heureDebut') {
      this.eventDetails.heureDebut = this.eventDetails.heureDebut;
    }
    if (field === 'heureFin') {
      this.eventDetails.heureFin = this.eventDetails.heureFin;
    }
    if (field === 'latitude') {
      this.eventDetails.latitude = this.eventDetails.latitude;
    }
    if (field === 'longitude') {
      this.eventDetails.longitude = this.eventDetails.longitude;
    }
    if (field === 'commentaire') {
      this.eventDetails.label = this.eventDetails.commentaire;
    }
    if (field === 'nbBenevoleRequis') {
      this.eventDetails.nbBenevoleRequis = this.eventDetails.nbBenevoleRequis;
    }
    if (field === 'nbRepasPrevu') {
      this.eventDetails.nbRepasPrevu = this.eventDetails.nbRepasPrevu;
    }

    // Ajoutez des conditions similaires pour d'autres champs si nécessaire
  }

  modifierEvenement(id: number) {
    const updatedEvent = {
      id_event: this.eventDetails.id,
      label_event: this.eventDetails.label,
      nbBenevoleRequis: this.eventDetails.nbBenevoleRequis,
      nb_repas_prevu: this.eventDetails.nbRepasPrevu, // Corrected to match db column
      latitude_event: this.eventDetails.latitude,
      longitude_event: this.eventDetails.longitude,
      rue_event: this.eventDetails.rue,
      ville_event: this.eventDetails.ville,
      cp_event: this.eventDetails.cp,
      date_event: this.eventDetails.date, // date mise à jour ici
      heure_debut_event: this.eventDetails.heureDebut,
      heure_fin_event: this.eventDetails.heureFin,
      commentaire: this.eventDetails.commentaire
    };


    console.log('Updated Event:', updatedEvent);

    this.http.put(`http://localhost:3001/api/evenements/modifier/update/${this.eventId}`, updatedEvent)
      .subscribe(

        (response) => {
          console.log(id);
          console.log('Événement modifié avec succès', response);
          this.router.navigate(['/home']);
        },
        (error) => {
          console.error('Erreur lors de la modification de l\'événement:', error);
          if (error.status === 400) {
            console.error('Erreur 400 - Mauvaise requête :', error.error);
          } else {
            console.error('Erreur non traitée:', error);
          }
        }
      );
  }
  goBack() {
    this.router.navigate(['/home']);
  }

}

