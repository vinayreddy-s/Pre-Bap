import { TestBed } from '@angular/core/testing';

import { IdcardGuard } from './idcard.guard';

describe('IdcardGuard', () => {
  let guard: IdcardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IdcardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
