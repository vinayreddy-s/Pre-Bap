import { TestBed } from '@angular/core/testing';

import { EditMediclaimGuardService } from './edit-mediclaim-guard.service';

describe('EditMediclaimGuardService', () => {
  let service: EditMediclaimGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditMediclaimGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
