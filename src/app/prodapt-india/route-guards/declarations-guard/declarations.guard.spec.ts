import { TestBed } from '@angular/core/testing';

import { DeclarationsGuard } from './declarations.guard';

describe('DeclarationsGuard', () => {
  let guard: DeclarationsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DeclarationsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
