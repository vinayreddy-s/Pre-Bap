import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormtwonomineeDetailsComponent } from './formtwonominee-details.component';

describe('FormtwonomineeDetailsComponent', () => {
  let component: FormtwonomineeDetailsComponent;
  let fixture: ComponentFixture<FormtwonomineeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormtwonomineeDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormtwonomineeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
