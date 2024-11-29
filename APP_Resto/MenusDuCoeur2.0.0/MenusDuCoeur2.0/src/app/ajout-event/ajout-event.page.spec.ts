import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AjoutEventPage } from './ajout-event.page';

describe('AjoutEventPage', () => {
  let component: AjoutEventPage;
  let fixture: ComponentFixture<AjoutEventPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutEventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
