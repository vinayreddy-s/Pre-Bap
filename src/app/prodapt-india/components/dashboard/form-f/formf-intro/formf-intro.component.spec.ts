import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormfIntroComponent } from './formf-intro.component';

describe('FormfIntroComponent', () => {
  let component: FormfIntroComponent;
  let fixture: ComponentFixture<FormfIntroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormfIntroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormfIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
