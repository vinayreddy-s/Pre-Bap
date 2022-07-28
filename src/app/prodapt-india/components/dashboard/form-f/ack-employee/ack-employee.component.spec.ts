import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AckEmployeeComponent } from './ack-employee.component';

describe('AckEmployeeComponent', () => {
  let component: AckEmployeeComponent;
  let fixture: ComponentFixture<AckEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AckEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AckEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
