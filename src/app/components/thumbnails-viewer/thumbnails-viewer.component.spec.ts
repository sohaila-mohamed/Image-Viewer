import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThumbnailsViewerComponent } from './thumbnails-viewer.component';

describe('ThumbnailsViewerComponent', () => {
  let component: ThumbnailsViewerComponent;
  let fixture: ComponentFixture<ThumbnailsViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThumbnailsViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThumbnailsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
