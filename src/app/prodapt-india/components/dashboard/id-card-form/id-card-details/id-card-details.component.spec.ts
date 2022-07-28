import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdCardDetailsComponent } from './id-card-details.component';

describe('IdCardDetailsComponent', () => {
  let component: IdCardDetailsComponent;
  let fixture: ComponentFixture<IdCardDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdCardDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdCardDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
