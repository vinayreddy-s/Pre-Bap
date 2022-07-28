import { TestBed } from '@angular/core/testing';

import { EditCAFGuardService } from './edit-caf-guard.service';

describe('EditGuardService', () => {
  let service: EditCAFGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditCAFGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
