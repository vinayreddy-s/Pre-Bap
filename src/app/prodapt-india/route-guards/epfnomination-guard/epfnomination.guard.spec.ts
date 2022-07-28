import { TestBed } from '@angular/core/testing';

import { EpfnominationGuard } from './epfnomination.guard';

describe('EpfnominationGuard', () => {
  let guard: EpfnominationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EpfnominationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
