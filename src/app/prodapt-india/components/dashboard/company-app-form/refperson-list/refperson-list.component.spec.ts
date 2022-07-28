import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefpersonListComponent } from './refperson-list.component';

describe('RefpersonListComponent', () => {
  let component: RefpersonListComponent;
  let fixture: ComponentFixture<RefpersonListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefpersonListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RefpersonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
