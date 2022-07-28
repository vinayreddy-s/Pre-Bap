import { TestBed } from '@angular/core/testing';

import { WelfareFundService } from './welfare-fund.service';

describe('WelfareFundService', () => {
  let service: WelfareFundService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WelfareFundService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
