import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrganisateurInscriptionPage } from './organisateur-inscription.page';

describe('OrganisateurInscriptionPage', () => {
  let component: OrganisateurInscriptionPage;
  let fixture: ComponentFixture<OrganisateurInscriptionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganisateurInscriptionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
