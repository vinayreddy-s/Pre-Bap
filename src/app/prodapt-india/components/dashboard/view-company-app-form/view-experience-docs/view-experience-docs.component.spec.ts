import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewExperienceDocsComponent } from './view-experience-docs.component';

describe('ViewExperienceDocsComponent', () => {
  let component: ViewExperienceDocsComponent;
  let fixture: ComponentFixture<ViewExperienceDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewExperienceDocsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewExperienceDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
