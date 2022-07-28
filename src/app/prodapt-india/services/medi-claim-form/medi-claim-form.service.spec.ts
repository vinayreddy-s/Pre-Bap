import { TestBed } from '@angular/core/testing';

import { MediclaimFormService } from './medi-claim-form.service';

describe('MediclaimFormService', () => {
  let service: MediclaimFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MediclaimFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
