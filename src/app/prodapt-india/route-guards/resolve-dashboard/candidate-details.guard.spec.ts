import { TestBed } from '@angular/core/testing';

import { CandidateDetailsGuard } from './candidate-details.guard';

describe('CandidateGuard', () => {
  let guard: CandidateDetailsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CandidateDetailsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
