import { TestBed } from '@angular/core/testing';

import { CafGuard } from './caf.guard';

describe('CafGuard', () => {
  let guard: CafGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CafGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
