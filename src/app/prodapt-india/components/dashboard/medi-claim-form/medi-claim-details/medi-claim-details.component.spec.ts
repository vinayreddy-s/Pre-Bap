import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediClaimDetailsComponent } from './medi-claim-details.component';

describe('MediClaimDetailsComponent', () => {
  let component: MediClaimDetailsComponent;
  let fixture: ComponentFixture<MediClaimDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediClaimDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediClaimDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
