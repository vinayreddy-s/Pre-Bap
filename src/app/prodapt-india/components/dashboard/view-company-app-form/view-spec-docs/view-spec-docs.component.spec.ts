import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSpecDocsComponent } from './view-spec-docs.component';

describe('ViewSpecDocsComponent', () => {
  let component: ViewSpecDocsComponent;
  let fixture: ComponentFixture<ViewSpecDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSpecDocsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSpecDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
