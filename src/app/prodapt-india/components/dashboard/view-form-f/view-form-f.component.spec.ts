import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFormFComponent } from './view-form-f.component';

describe('ViewFormFComponent', () => {
  let component: ViewFormFComponent;
  let fixture: ComponentFixture<ViewFormFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFormFComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFormFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
