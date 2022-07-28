import { TestBed } from '@angular/core/testing';

import { EditEpfkycGuardService } from './edit-epfkyc-guard.service';

describe('EditEpfkycGuardService', () => {
  let service: EditEpfkycGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditEpfkycGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
