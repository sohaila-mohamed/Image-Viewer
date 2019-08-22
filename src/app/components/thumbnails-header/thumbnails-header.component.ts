import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-thumbnails-header',
  templateUrl: './thumbnails-header.component.html',
  styleUrls: ['./thumbnails-header.component.css']
})

export class ThumbnailsHeaderComponent implements OnInit {
  @Input() ImagesNumber: number;

  public progress: number;
  public message: string;

  constructor() { }

  ngOnInit() {
  }

  
}


