import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFormElevenComponent } from './view-form-eleven.component';

describe('ViewFormElevenComponent', () => {
  let component: ViewFormElevenComponent;
  let fixture: ComponentFixture<ViewFormElevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFormElevenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFormElevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
