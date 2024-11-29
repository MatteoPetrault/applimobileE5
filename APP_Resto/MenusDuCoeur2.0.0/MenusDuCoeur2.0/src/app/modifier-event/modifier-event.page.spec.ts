import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModifierEventPage } from './modifier-event.page';

describe('ModifierEventPage', () => {
  let component: ModifierEventPage;
  let fixture: ComponentFixture<ModifierEventPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierEventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
