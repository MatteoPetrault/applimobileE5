import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-benevole-inscription',
    templateUrl: './benevole-inscription.page.html',
    styleUrls: ['./benevole-inscription.page.scss'],
    standalone: false
})
export class BenevoleInscriptionPage implements OnInit {
  benevoleForm!: FormGroup;
  isSubmitted = false;

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService,
    private router: Router,
    private http: HttpClient) { }

  ngOnInit() {
    this.benevoleForm = this.fb.group({
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
    if (this.benevoleForm.valid) {
      const formData = this.benevoleForm.value;
      this.http.post('http://localhost:3001/api/inscription-benevole', formData).subscribe(response => {
        console.log('Inscription réussie', response);
        this.isSubmitted = true;
      }, error => {
        console.error('Erreur lors de l\'inscription', error);
      });
    }
  }
  goBack() {
      this.router.navigate(['/inscription']);
  }
}
