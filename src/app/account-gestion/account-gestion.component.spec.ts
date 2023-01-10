import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountGestionComponent } from './account-gestion.component';

describe('AccountGestionComponent', () => {
  let component: AccountGestionComponent;
  let fixture: ComponentFixture<AccountGestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountGestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
