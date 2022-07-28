import { TestBed } from '@angular/core/testing';

import { EditEpfnominationGuardService } from './edit-epfnomination-guard.service';

describe('EditEpfnominationGuardService', () => {
  let service: EditEpfnominationGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditEpfnominationGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
