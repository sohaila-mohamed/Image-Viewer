import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InteractionsService {

  constructor() { }
  private _BigImageID=new Subject<string>();
  BigImage$=this._BigImageID.asObservable();
  SendBigImageID(Id: string){
    this._BigImageID.next(Id);

  }


  private _Grayfilter=new Subject<Event>();
  GrayFilter$=this._Grayfilter.asObservable();
  SendGrayFilterOrder(){
    this._Grayfilter.next();
    console.log("grayfilter order");

  }
  private _EditMode=new Subject <string>();
  EditMode$=this._EditMode.asObservable();
  SendSelectedMode(mode){
    this._EditMode.next(mode);
  }


}
