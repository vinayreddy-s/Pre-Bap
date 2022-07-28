import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediClaimFormComponent } from './medi-claim-form.component';

describe('MediClaimFormComponent', () => {
  let component: MediClaimFormComponent;
  let fixture: ComponentFixture<MediClaimFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediClaimFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediClaimFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
