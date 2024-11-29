import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BenevoleInscriptionPage } from './benevole-inscription.page';

describe('BenevoleInscriptionPage', () => {
  let component: BenevoleInscriptionPage;
  let fixture: ComponentFixture<BenevoleInscriptionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BenevoleInscriptionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
