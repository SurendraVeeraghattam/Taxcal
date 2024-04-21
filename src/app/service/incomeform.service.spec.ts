import { TestBed } from '@angular/core/testing';

import { IncomeformService } from './incomeform.service';

describe('IncomeformService', () => {
  let service: IncomeformService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IncomeformService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
