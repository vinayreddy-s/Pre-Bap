import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NdaDocumentComponent } from './nda-document.component';

describe('NdaDocumentComponent', () => {
  let component: NdaDocumentComponent;
  let fixture: ComponentFixture<NdaDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NdaDocumentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NdaDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
