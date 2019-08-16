import { Injectable } from '@angular/core';
import { Images } from './components/modules/image-array';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  SmallImages:Images[];


  constructor() {
    this.SmallImages=[
     {scr1: '../assets/InternProjectsample/im_0014_bak - copy.dcm.small.png',scr2: '../assets/InternProjectsample/im_0015_bak - copy.dcm.small.png',scr3: '../assets/InternProjectsample/im_0016_bak - copy.dcm.small.png'},
     {scr1: '../assets/InternProjectsample/im_0017_bak - copy.dcm.small.png',scr2: '../assets/InternProjectsample/im_0018_bak - copy.dcm.small.png',scr3: '../assets/InternProjectsample/im_0019_bak - copy.dcm.small.png'},
     {scr1: '../assets/InternProjectsample/im_0020_bak - copy.dcm.small.png',scr2: '../assets/InternProjectsample/im_0021_bak - copy.dcm.small.png',scr3: '../assets/InternProjectsample/im_0022_bak - copy.dcm.small.png'},
     {scr1: '../assets/InternProjectsample/im_0023_bak - copy.dcm.small.png',scr2: '../assets/InternProjectsample/im_0024_bak - copy.dcm.small.png',scr3: '../assets/InternProjectsample/im_0025_bak - copy.dcm.small.png'},
     {scr1: '../assets/InternProjectsample/im_0026_bak - copy.dcm.small.png',scr2: '../assets/InternProjectsample/im_0027_bak - copy.dcm.small.png',scr3: '../assets/InternProjectsample/im_0028_bak - copy.dcm.small.png'},
     {scr1: '../assets/InternProjectsample/im_0029_bak - copy.dcm.small.png',scr2: '../assets/InternProjectsample/im_0030_bak - copy.dcm.small.png',scr3: '../assets/InternProjectsample/im_0031_bak - copy.dcm.small.png'},
     {scr1: '../assets/InternProjectsample/im_0034_bak - copy.dcm.small.png',scr2: '../assets/InternProjectsample/im_0032_bak - copy.dcm.small.png',scr3: '../assets/InternProjectsample/im_0033_bak - copy.dcm.small.png'},
     {scr1: '../assets/InternProjectsample/im_0035_bak - copy.dcm.small.png',scr2: '../assets/InternProjectsample/im_0036_bak - copy.dcm.small.png',scr3: '../assets/InternProjectsample/im_0038_bak - copy.dcm.small.png'},
     {scr1: '../assets/InternProjectsample/im_0039_bak - copy.dcm.small.png',scr2: '../assets/InternProjectsample/im_0040_bak - copy.dcm.small.png',scr3: '../assets/InternProjectsample/1883337_small.png'}

    ];
  }
GetSmallImages=() =>{
    return this.SmallImages;}
}

