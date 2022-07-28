import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMediClaimFormComponent } from './view-medi-claim-form.component';

describe('ViewMediClaimFormComponent', () => {
  let component: ViewMediClaimFormComponent;
  let fixture: ComponentFixture<ViewMediClaimFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMediClaimFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMediClaimFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
