import { TestBed } from '@angular/core/testing';

import { IncomeTypeService } from './income-type.service';

describe('IncomeTypeService', () => {
  let service: IncomeTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IncomeTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
