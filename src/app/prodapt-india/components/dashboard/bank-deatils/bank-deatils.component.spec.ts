import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankDeatilsComponent } from './bank-deatils.component';

describe('BankDeatilsComponent', () => {
  let component: BankDeatilsComponent;
  let fixture: ComponentFixture<BankDeatilsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankDeatilsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankDeatilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
