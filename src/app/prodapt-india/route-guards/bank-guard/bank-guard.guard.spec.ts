import { TestBed } from '@angular/core/testing';

import { BankGuardGuard } from './bank-guard.guard';

describe('BankGuardGuard', () => {
  let guard: BankGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(BankGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
