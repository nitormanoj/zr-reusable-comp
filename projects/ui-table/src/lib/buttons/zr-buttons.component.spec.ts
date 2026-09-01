import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZrButtonsComponent } from './zr-buttons.component';

describe('ZrButtonsComponent', () => {
  let component: ZrButtonsComponent;
  let fixture: ComponentFixture<ZrButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZrButtonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZrButtonsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
