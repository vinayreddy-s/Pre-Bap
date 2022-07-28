import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaDocumentComponent } from './loa-document.component';

describe('LoaDocumentComponent', () => {
  let component: LoaDocumentComponent;
  let fixture: ComponentFixture<LoaDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoaDocumentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
