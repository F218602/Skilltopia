import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionPopupComponent } from './question-popup.component';

describe('QuestionPopupComponent', () => {
  let component: QuestionPopupComponent;
  let fixture: ComponentFixture<QuestionPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionPopupComponent]
    });
    fixture = TestBed.createComponent(QuestionPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
