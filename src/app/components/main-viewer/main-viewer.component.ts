import { Component, OnInit } from '@angular/core';
import { InteractionsService } from 'src/app/interactions.service';
import { ServiceService } from 'src/app/Data.service';

@Component({
  selector: 'app-main-viewer',
  templateUrl: './main-viewer.component.html',
  styleUrls: ['./main-viewer.component.css']
})
export class MainViewerComponent implements OnInit {
  ImageID: number;
  BigImageSource:string[];
  constructor(private _interaction: InteractionsService, private service: ServiceService) {

   }

  ngOnInit() {
    this._interaction.BigImage$.subscribe(massage => {console.log('From main viewer'); this.ImageID = massage;this.BigImageSource=this.service.GetFullImage(this.ImageID); });

  }

}
