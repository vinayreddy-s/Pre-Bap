import { TestBed } from '@angular/core/testing';

import { EditBankdetailsGuardService } from './edit-bankdetails-guard.service';

describe('EditBankdetailsGuardService', () => {
  let service: EditBankdetailsGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditBankdetailsGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
