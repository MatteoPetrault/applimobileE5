import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListeEventPage } from './liste-event.page';

describe('ListeEventPage', () => {
  let component: ListeEventPage;
  let fixture: ComponentFixture<ListeEventPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeEventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
