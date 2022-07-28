import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewIdentityDocsComponent } from './view-identity-docs.component';

describe('ViewIdentityDocsComponent', () => {
  let component: ViewIdentityDocsComponent;
  let fixture: ComponentFixture<ViewIdentityDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewIdentityDocsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewIdentityDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
