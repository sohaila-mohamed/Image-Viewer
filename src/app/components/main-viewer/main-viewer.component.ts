import { Component, OnInit } from '@angular/core';
import { InteractionsService } from 'src/app/interactions.service';

@Component({
  selector: 'app-main-viewer',
  templateUrl: './main-viewer.component.html',
  styleUrls: ['./main-viewer.component.css']
})
export class MainViewerComponent implements OnInit {
  Image:string;
  constructor(private _interaction:InteractionsService) {

   }

  ngOnInit() {
    this._interaction.BigImage$.subscribe(massage=>{console.log("From main viewer",this.Image=massage)});

  }

}
