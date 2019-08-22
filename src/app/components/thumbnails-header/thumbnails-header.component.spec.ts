import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThumbnailsHeaderComponent } from './thumbnails-header.component';

describe('ThumbnailsHeaderComponent', () => {
  let component: ThumbnailsHeaderComponent;
  let fixture: ComponentFixture<ThumbnailsHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThumbnailsHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThumbnailsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
