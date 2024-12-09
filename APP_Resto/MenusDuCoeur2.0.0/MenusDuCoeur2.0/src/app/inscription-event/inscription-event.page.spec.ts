import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InscriptionEventPage } from './inscription-event.page';

describe('InscriptionEventPage', () => {
  let component: InscriptionEventPage;
  let fixture: ComponentFixture<InscriptionEventPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InscriptionEventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
