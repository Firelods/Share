import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionGroupComponent } from './gestion-group.component';

describe('GestionGroupComponent', () => {
  let component: GestionGroupComponent;
  let fixture: ComponentFixture<GestionGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
