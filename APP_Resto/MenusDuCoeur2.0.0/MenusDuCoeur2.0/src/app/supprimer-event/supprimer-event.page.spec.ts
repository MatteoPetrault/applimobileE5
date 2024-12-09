import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SupprimerEventPage } from './supprimer-event.page';

describe('SupprimerEventPage', () => {
  let component: SupprimerEventPage;
  let fixture: ComponentFixture<SupprimerEventPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SupprimerEventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
