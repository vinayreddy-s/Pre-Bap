import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewWelfareFundComponent } from './view-welfare-fund.component';

describe('ViewWelfareFundComponent', () => {
  let component: ViewWelfareFundComponent;
  let fixture: ComponentFixture<ViewWelfareFundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewWelfareFundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewWelfareFundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
