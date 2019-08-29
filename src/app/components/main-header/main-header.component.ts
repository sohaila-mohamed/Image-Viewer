import { Component, OnInit } from '@angular/core';
import { InteractionsService } from 'src/app/interactions.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit {

  constructor(private _interaction: InteractionsService,) { }

  ngOnInit() {
  }

}
