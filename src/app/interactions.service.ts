import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InteractionsService {

  constructor() { }
  private _BigImageSourse=new Subject<string>();
  BigImage$=this._BigImageSourse.asObservable();
  
  SendBigImageSource(src:string){
    this._BigImageSourse.next(src);

  }
}
