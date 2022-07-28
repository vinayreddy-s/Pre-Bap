import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFormTwoComponent } from './view-form-two.component';

describe('ViewFormTwoComponent', () => {
  let component: ViewFormTwoComponent;
  let fixture: ComponentFixture<ViewFormTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFormTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFormTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
