import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Image } from '../modules/image-type';
import { ImagesHome } from '../modules/image-array';
import { IThumbImage } from 'src/app/CustomTypes/Types';
@Component({
  selector: 'app-thumbnails-viewer',
  templateUrl: './thumbnails-viewer.component.html',
  styleUrls: ['./thumbnails-viewer.component.css']
})
export class ThumbnailsViewerComponent implements OnInit {

  @Input() SmallImage: IThumbImage;
 
  @Output() BigImageEvent = new EventEmitter<string>();


  constructor() {

   }

  ngOnInit() {
    console.log('ThumbImages Are Recived', this.SmallImage);


  }
  SendBigImage = (scr:string) => {
    console.log('Sendit');
    this.BigImageEvent.emit(scr);

  }

}
