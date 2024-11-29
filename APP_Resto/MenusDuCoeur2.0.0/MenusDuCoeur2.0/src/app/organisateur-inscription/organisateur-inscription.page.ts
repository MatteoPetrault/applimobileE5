import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-organisateur-inscription',
    templateUrl: './organisateur-inscription.page.html',
    styleUrls: ['./organisateur-inscription.page.scss'],
    standalone: false
})
export class OrganisateurInscriptionPage implements OnInit {
  organisateurForm!: FormGroup;
  isSubmitted = false; // Variable d'état pour contrôler l'affichage

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService,
    private router: Router,
    private http: HttpClient) { }

  ngOnInit() {
    this.organisateurForm = this.fb.group({
      pseudo_util: ['', Validators.required],
      mdp_util: ['', Validators.required],
      nom_util: ['', Validators.required],
      prenom_util: ['', Validators.required],
      tel_util: ['', Validators.required],
      cp_util: ['', Validators.required],
      ville_util: ['', Validators.required],
      rue_util: ['', Validators.required],
      date_naissance: ['', [Validators.required]],
      mail_util: ['', [Validators.required, Validators.email]],
      message_motiv_util: ['', Validators.required]
    });
  }

  submitForm() {
    if (this.organisateurForm.valid) {
      const formData = this.organisateurForm.value;
      this.http.post('http://localhost:3001/api/inscription-organisateur', formData).subscribe(
        response => {
          console.log('Inscription réussie', response);
          this.isSubmitted = true; // Bascule sur l'horloge et le message
        },
        error => {
          console.error('Erreur lors de l\'inscription', error);
        }
      );
    }
  }
  goBack() {
    this.router.navigate(['/inscription']);
    }
  }
