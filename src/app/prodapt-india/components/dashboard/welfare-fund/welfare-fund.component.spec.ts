import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelfareFundComponent } from './welfare-fund.component';

describe('WelfareFundComponent', () => {
  let component: WelfareFundComponent;
  let fixture: ComponentFixture<WelfareFundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WelfareFundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WelfareFundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
