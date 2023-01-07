import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecapComponent } from './recap.component';

describe('RecapComponent', () => {
  let component: RecapComponent;
  let fixture: ComponentFixture<RecapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
