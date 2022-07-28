import { TestBed } from '@angular/core/testing';

import { ConsentGuard } from './consent.guard';

describe('ConsentGuardGuard', () => {
  let guard: ConsentGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ConsentGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
