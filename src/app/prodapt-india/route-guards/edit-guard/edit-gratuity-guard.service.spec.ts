import { TestBed } from '@angular/core/testing';

import { EditGratuityGuardService } from './edit-gratuity-guard.service';

describe('EditGratuityGuardService', () => {
  let service: EditGratuityGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditGratuityGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
