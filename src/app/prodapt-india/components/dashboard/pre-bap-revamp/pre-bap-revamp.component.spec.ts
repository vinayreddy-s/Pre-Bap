import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreBapRevampComponent } from './pre-bap-revamp.component';

describe('PreBapRevampComponent', () => {
  let component: PreBapRevampComponent;
  let fixture: ComponentFixture<PreBapRevampComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreBapRevampComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreBapRevampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
