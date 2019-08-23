import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Image } from '../modules/image-type';
import { ImagesHome } from '../modules/image-array';
import { IThumbImage } from 'src/app/CustomTypes/Types';
import { DataService } from 'src/app/Data.service';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-thumbnails-viewer',
  templateUrl: './thumbnails-viewer.component.html',
  styleUrls: ['./thumbnails-viewer.component.css']
})
export class ThumbnailsViewerComponent implements OnInit {

  @Input() ImageID: string;


  @Output() BigImageEvent = new EventEmitter<string>();
  ImageSource: SafeUrl;


  constructor(private _service: DataService,private domSanitizer: DomSanitizer) {

   }

  ngOnInit() {
    console.log('ImageID Are Recived', this.ImageID);
    this.RequestImages(this.ImageID);




  }
  SendBigImage = (scr:string) => {
    console.log('Sendit');
    this.BigImageEvent.emit(scr);

  }
  RequestImages(Id:string){
    this._service.GetImage(Id)
    .subscribe(data =>{
    this.ImageSource = this.domSanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(data));
    console.log("Image Request From Angular",this.ImageSource);

  });
  }

}
