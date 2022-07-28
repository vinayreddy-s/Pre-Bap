import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialisedTrainingComponent } from './specialised-training.component';

describe('SpecialisedTrainingComponent', () => {
  let component: SpecialisedTrainingComponent;
  let fixture: ComponentFixture<SpecialisedTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialisedTrainingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialisedTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
