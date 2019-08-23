import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { ImagesHome } from '../modules/image-array';
import { DataService } from 'src/app/Data.service';
import { InteractionsService } from 'src/app/interactions.service';
import { IImageSource, IThumbImage, InstanceModel } from 'src/app/CustomTypes/Types';
import { isDefined } from '@angular/compiler/src/util';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.css']
})
export class ThumbnailComponent implements OnInit {
  thumImages: IThumbImage[];
  @Input() massage: string;
  BigImageId: number;
  ImagesNumber: number;
  ImagesIds: InstanceModel[];




  constructor(private _service: DataService, private _interaction: InteractionsService) {
  // tslint:disable-next-line: no-unused-expression

  this.thumImages = _service.GetSmallImages();



  }


  ngOnInit() {
    console.log('Request Images MetaData');
    console.log('Send Get Request');
    this._service.GetImageIDs().subscribe(data =>{
      this.ImagesIds = data;
      console.log("From Angular",this.ImagesIds);
      this.ImagesNumber = this.ImagesIds.length;


     });








  }
  ReciveImageId = ($event) => {
    this.BigImageId = $event;
    console.log(this.BigImageId);
    this._interaction.SendBigImageID(this.BigImageId);
  }





}
