import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndGamePopUpComponent } from './end-game-pop-up.component';

describe('EndGamePopUpComponent', () => {
  let component: EndGamePopUpComponent;
  let fixture: ComponentFixture<EndGamePopUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EndGamePopUpComponent]
    });
    fixture = TestBed.createComponent(EndGamePopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
