import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeductionTypeComponent } from './deduction-type.component';

describe('DeductionTypeComponent', () => {
  let component: DeductionTypeComponent;
  let fixture: ComponentFixture<DeductionTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeductionTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeductionTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
