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
}
