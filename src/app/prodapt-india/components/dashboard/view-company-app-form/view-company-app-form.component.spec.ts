import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCompanyAppFormComponent } from './view-company-app-form.component';

describe('ViewCompanyAppFormComponent', () => {
  let component: ViewCompanyAppFormComponent;
  let fixture: ComponentFixture<ViewCompanyAppFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCompanyAppFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCompanyAppFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
