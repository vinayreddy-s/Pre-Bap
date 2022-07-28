import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediFamDetailsComponent } from './medi-fam-details.component';

describe('MediFamDetailsComponent', () => {
  let component: MediFamDetailsComponent;
  let fixture: ComponentFixture<MediFamDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediFamDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediFamDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
