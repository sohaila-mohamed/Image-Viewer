import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { ImagesHome } from '../modules/image-array';
import { ServiceService } from 'src/app/Data.service';
import { InteractionsService } from 'src/app/interactions.service';
import { IImageSource, IThumbImage } from 'src/app/CustomTypes/Types';


@Component({
  selector: 'app-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.css']
})
export class ThumbnailComponent implements OnInit {
  thumImages: IThumbImage[];
  @Input() massage: string;
  BigImageId: number;


  constructor(service: ServiceService, private _interaction: InteractionsService) {
  // tslint:disable-next-line: no-unused-expression

  this.thumImages = service.GetSmallImages();

  }


  ngOnInit() {


  }
  ReciveImageId = ($event) => {
    this.BigImageId = $event;
    console.log(this.BigImageId);
    this._interaction.SendBigImageID(this.BigImageId);
  }



}
