import { TestBed } from '@angular/core/testing';

import { EpfkycGuard } from './epfkyc.guard';

describe('EpfkycGuard', () => {
  let guard: EpfkycGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EpfkycGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
