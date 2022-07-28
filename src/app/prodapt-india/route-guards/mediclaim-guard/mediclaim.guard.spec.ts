import { TestBed } from '@angular/core/testing';

import { MediclaimGuard } from './mediclaim.guard';

describe('MediclaimGuard', () => {
  let guard: MediclaimGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MediclaimGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
