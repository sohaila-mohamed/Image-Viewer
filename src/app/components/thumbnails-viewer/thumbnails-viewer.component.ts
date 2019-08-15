import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { Images } from '../modules/image-array';
@Component({
  selector: 'app-thumbnails-viewer',
  templateUrl: './thumbnails-viewer.component.html',
  styleUrls: ['./thumbnails-viewer.component.css']
})
export class ThumbnailsViewerComponent implements OnInit {

  @Input() ParentImages:Images;
  @Output() BigImageEvent= new EventEmitter<string>();


  constructor() {

   }

  ngOnInit() {
    console.log("ThumbImages Are Recived",this.ParentImages);


  }
  SendBigImage=()=>{
    console.log("Sendit");
    this.BigImageEvent.emit(this.ParentImages.scr3);

  }

}
