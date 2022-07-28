import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdCardFormComponent } from './id-card-form.component';

describe('IdCardFormComponent', () => {
  let component: IdCardFormComponent;
  let fixture: ComponentFixture<IdCardFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdCardFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdCardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
