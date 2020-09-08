import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextDropComponent } from './text-drop.component';

describe('TextDropComponent', () => {
  let component: TextDropComponent;
  let fixture: ComponentFixture<TextDropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextDropComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
