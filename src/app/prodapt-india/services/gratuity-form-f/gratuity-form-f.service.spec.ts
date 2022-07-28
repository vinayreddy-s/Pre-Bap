import { TestBed } from '@angular/core/testing';

import { GratuityFormFService } from './gratuity-form-f.service';

describe('GratuityFormFService', () => {
  let service: GratuityFormFService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GratuityFormFService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
