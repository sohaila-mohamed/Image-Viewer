import { SafeUrl } from '@angular/platform-browser';

export interface IImageSource{
  Id: number;
  ThumbImage: string;
  FullImage: string;
}
export interface IThumbImage{
  Id: string;
  Thumb: SafeUrl;

 }
export interface InstanceModel{
  Id:string;
}
