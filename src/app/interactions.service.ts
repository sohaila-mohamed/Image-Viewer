import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InteractionsService {

  constructor() { }
  private _BigImageID=new Subject<number>();
  BigImage$=this._BigImageID.asObservable();

  SendBigImageID(Id:number){
    this._BigImageID.next(Id);

  }
}
