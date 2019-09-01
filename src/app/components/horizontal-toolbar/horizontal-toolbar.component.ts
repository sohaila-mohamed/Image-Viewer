import { Component, OnInit } from '@angular/core';
import { InteractionsService } from 'src/app/interactions.service';
import { MainViewerComponent } from '../main-viewer/main-viewer.component';


@Component({
  providers: [ MainViewerComponent],
  selector: 'app-horizontal-toolbar',
  templateUrl: './horizontal-toolbar.component.html',
  styleUrls: ['./horizontal-toolbar.component.css']
})
export class HorizontalToolbarComponent implements OnInit {

  constructor(private _interaction: InteractionsService, private viewer: MainViewerComponent){}

  ngOnInit() {
  }
  ApplyGrayFilter(){
    this._interaction.SendGrayFilterOrder();
  }
  SendMode(mode :string){
    this._interaction.SendSelectedMode(mode);
    console.log("mode",mode);
  }

}

