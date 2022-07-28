import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpfnomineeDetailsComponent } from './epfnominee-details.component';

describe('EpfnomineeDetailsComponent', () => {
  let component: EpfnomineeDetailsComponent;
  let fixture: ComponentFixture<EpfnomineeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EpfnomineeDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EpfnomineeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
