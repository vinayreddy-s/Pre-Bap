import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclarationFormComponent } from './declaration-form.component';

describe('DeclarationFormComponent', () => {
  let component: DeclarationFormComponent;
  let fixture: ComponentFixture<DeclarationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeclarationFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeclarationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
