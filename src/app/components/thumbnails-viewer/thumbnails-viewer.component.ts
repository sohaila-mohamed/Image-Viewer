import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Image } from '../modules/image-type';
import { ImagesHome } from '../modules/image-array';
@Component({
  selector: 'app-thumbnails-viewer',
  templateUrl: './thumbnails-viewer.component.html',
  styleUrls: ['./thumbnails-viewer.component.css']
})
export class ThumbnailsViewerComponent implements OnInit {

  @Input() ParentImages: ImagesHome;
  @Output() BigImageEvent = new EventEmitter<string>();


  constructor() {

   }

  ngOnInit() {
    console.log('ThumbImages Are Recived', this.ParentImages);


  }
  SendBigImage = (scr:string) => {
    console.log('Sendit');
    this.BigImageEvent.emit(scr);

  }

}
