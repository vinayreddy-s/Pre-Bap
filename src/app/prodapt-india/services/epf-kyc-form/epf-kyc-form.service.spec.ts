import { TestBed } from '@angular/core/testing';

import { EpfKycFormService } from './epf-kyc-form.service';

describe('EpfKycFormService', () => {
  let service: EpfKycFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EpfKycFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
