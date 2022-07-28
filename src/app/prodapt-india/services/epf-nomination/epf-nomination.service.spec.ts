import { TestBed } from '@angular/core/testing';

import { EpfNominationService } from './epf-nomination.service';

describe('EpfNominationService', () => {
  let service: EpfNominationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EpfNominationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
