import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackbarTemplateComponent } from './snackbar-template.component';

describe('SnackbarTemplateComponent', () => {
  let component: SnackbarTemplateComponent;
  let fixture: ComponentFixture<SnackbarTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SnackbarTemplateComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackbarTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
