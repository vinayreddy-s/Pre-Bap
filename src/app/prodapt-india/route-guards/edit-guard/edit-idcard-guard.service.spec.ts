import { TestBed } from '@angular/core/testing';

import { EditIdcardGuardService } from './edit-idcard-guard.service';

describe('EditIdcardGuardService', () => {
  let service: EditIdcardGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditIdcardGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
