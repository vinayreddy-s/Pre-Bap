import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyAppFormComponent } from './company-app-form.component';

describe('CompanyAppFormComponent', () => {
  let component: CompanyAppFormComponent;
  let fixture: ComponentFixture<CompanyAppFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyAppFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyAppFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
