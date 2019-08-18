import { Component, OnInit,Input,Output, EventEmitter} from '@angular/core'
import { ImagesHome } from '../modules/image-array';
import { ServiceService } from 'src/app/service.service';
import { InteractionsService } from 'src/app/interactions.service';


@Component({
  selector: 'app-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.css']
})
export class ThumbnailComponent implements OnInit {
  thumImages: ImagesHome[];
  @Input() massage:string;
  BigImageSource:string;


  constructor(service:ServiceService, private _interaction:InteractionsService) {
    this.thumImages=service.GetSmallImages();
  }

  ngOnInit() {

    console.log(this.massage);

  }
  ReciveBigImage =($event)=>{
    this.BigImageSource=$event;
    console.log(this.BigImageSource);
    this._interaction.SendBigImageSource(this.BigImageSource);
  }



}
