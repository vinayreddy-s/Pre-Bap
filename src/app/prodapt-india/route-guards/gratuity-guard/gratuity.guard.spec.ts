import { TestBed } from '@angular/core/testing';

import { GratuityGuard } from './gratuity.guard';

describe('GratuityGuard', () => {
  let guard: GratuityGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GratuityGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
