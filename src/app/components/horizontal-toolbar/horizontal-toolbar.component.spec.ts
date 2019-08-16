import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalToolbarComponent } from './horizontal-toolbar.component';

describe('HorizontalToolbarComponent', () => {
  let component: HorizontalToolbarComponent;
  let fixture: ComponentFixture<HorizontalToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorizontalToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizontalToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
