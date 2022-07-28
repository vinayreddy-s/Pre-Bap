import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UndertakingDetailsComponent } from './undertaking-details.component';

describe('UndertakingDetailsComponent', () => {
  let component: UndertakingDetailsComponent;
  let fixture: ComponentFixture<UndertakingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UndertakingDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UndertakingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
