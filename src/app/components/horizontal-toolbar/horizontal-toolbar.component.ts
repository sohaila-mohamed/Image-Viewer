import { Component, OnInit } from '@angular/core';
import { InteractionsService } from 'src/app/interactions.service';

@Component({
  selector: 'app-horizontal-toolbar',
  templateUrl: './horizontal-toolbar.component.html',
  styleUrls: ['./horizontal-toolbar.component.css']
})
export class HorizontalToolbarComponent implements OnInit {

  constructor(private _interaction: InteractionsService,) { }

  ngOnInit() {
  }
  ApplyGrayFilter(){
    this._interaction.SendGrayFilterOrder();
  }

}
