import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpsfamilyDetailsComponent } from './epsfamily-details.component';

describe('EpsfamilyDetailsComponent', () => {
  let component: EpsfamilyDetailsComponent;
  let fixture: ComponentFixture<EpsfamilyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EpsfamilyDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EpsfamilyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
