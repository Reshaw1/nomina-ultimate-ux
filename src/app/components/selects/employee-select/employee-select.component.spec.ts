import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSelectComponent } from './employee-select.component';

describe('EmployeeSelectComponent', () => {
  let component: EmployeeSelectComponent;
  let fixture: ComponentFixture<EmployeeSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
