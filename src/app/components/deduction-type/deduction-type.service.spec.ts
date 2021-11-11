import { TestBed } from '@angular/core/testing';

import { DeductionTypeService } from './deduction-type.service';

describe('DeductionTypeService', () => {
  let service: DeductionTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeductionTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
