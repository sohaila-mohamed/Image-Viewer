import { Component, OnInit } from '@angular/core';
import { DataService } from './Data.service';
import { InstanceModel } from './CustomTypes/Types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./App.component.css'
]
})
export class AppComponent implements OnInit {
 
constructor(private _service: DataService){}

  ngOnInit() {


  }







}

