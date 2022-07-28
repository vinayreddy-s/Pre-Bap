import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEducationDocsComponent } from './view-education-docs.component';

describe('ViewEducationDocsComponent', () => {
  let component: ViewEducationDocsComponent;
  let fixture: ComponentFixture<ViewEducationDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEducationDocsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEducationDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
