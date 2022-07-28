import { TestBed } from '@angular/core/testing';

import { IdCardFormService } from './id-card-form.service';

describe('IdCardFormService', () => {
  let service: IdCardFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdCardFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
