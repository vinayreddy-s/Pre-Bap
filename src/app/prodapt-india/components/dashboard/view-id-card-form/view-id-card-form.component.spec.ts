import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewIdCardFormComponent } from './view-id-card-form.component';

describe('ViewIdCardFormComponent', () => {
  let component: ViewIdCardFormComponent;
  let fixture: ComponentFixture<ViewIdCardFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewIdCardFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewIdCardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
