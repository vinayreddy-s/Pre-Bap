import { TestBed } from '@angular/core/testing';

import { EditWelfareFundGuard } from './edit-welfare-fund.guard';

describe('EditWelfareFundGuard', () => {
  let guard: EditWelfareFundGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EditWelfareFundGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
