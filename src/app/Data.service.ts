import { Injectable, OnInit } from '@angular/core';
import { ImagesHome } from './components/modules/image-array';
import { IImageSource, InstanceModel } from './CustomTypes/Types';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  ImageSourceArray: IImageSource[];
  ListOfImagesId: InstanceModel[];
  GetIDsUrl: string = 'http://localhost:53501/api/MetaData/Get';
  GetImageUrl: string = 'http://localhost:53501/api/Thumbnails/Get/?Id=';
  ImageBlob:Blob;
  constructor(private http: HttpClient) {
    // tslint:disable-next-line: max-line-length
    this.ImageSourceArray = [

    {ThumbImage: '../assets/InternProjectsample/im_0013_bak - copy.dcm.small.png', FullImage: '../assets/InternProjectsample/im_0013_bak - copy_full.png', Id: 1},
    {ThumbImage: '../assets/InternProjectsample/im_0014_bak - copy.dcm.small.png', FullImage: '../assets/InternProjectsample/im_0014_bak - copy_full.png', Id: 2},
    {ThumbImage: '../assets/InternProjectsample/im_0015_bak - copy.dcm.small.png', FullImage: '../assets/InternProjectsample/im_0015_bak - copy_full.png', Id: 3},
    {ThumbImage: '../assets/InternProjectsample/im_0016_bak - copy.dcm.small.png', FullImage: '../assets/InternProjectsample/im_0016_bak - copy_full.png', Id: 4},
    {ThumbImage: '../assets/InternProjectsample/im_0017_bak - copy.dcm.small.png', FullImage: '../assets/InternProjectsample/im_0017_bak - copy_full.png', Id: 5},
    {ThumbImage: '../assets/InternProjectsample/im_0018_bak - copy.dcm.small.png', FullImage: '../assets/InternProjectsample/im_0018_bak - copy_full.png', Id: 6},
    {ThumbImage: '../assets/InternProjectsample/im_0019_bak - copy.dcm.small.png', FullImage: '../assets/InternProjectsample/im_0019_bak - copy_full.png', Id: 7},
    {ThumbImage: '../assets/InternProjectsample/im_0020_bak - copy.dcm.small.png', FullImage: '../assets/InternProjectsample/im_0020_bak - copy_full.png', Id: 8},
    {ThumbImage: '../assets/InternProjectsample/im_0021_bak - copy.dcm.small.png', FullImage: '../assets/InternProjectsample/im_0021_bak - copy_full.png', Id: 9},
    {ThumbImage: '../assets/InternProjectsample/im_0022_bak - copy.dcm.small.png', FullImage: '../assets/InternProjectsample/im_0022_bak - copy_full.png', Id: 10},
    {ThumbImage: '../assets/InternProjectsample/im_0023_bak - copy.dcm.small.png', FullImage: '../assets/InternProjectsample/im_0023_bak - copy_full.png', Id: 11},
    {ThumbImage: '../assets/InternProjectsample/im_0024_bak - copy.dcm.small.png', FullImage: '../assets/InternProjectsample/im_0024_bak - copy_full.png', Id: 12},
    {ThumbImage: '../assets/InternProjectsample/im_0025_bak - copy.dcm.small.png', FullImage: '../assets/InternProjectsample/im_0025_bak - copy_full.png', Id: 13},
    {ThumbImage: '../assets/InternProjectsample/im_0026_bak - copy.dcm.small.png', FullImage: '../assets/InternProjectsample/im_0026_bak - copy_full.png', Id: 14},
    {ThumbImage: '../assets/InternProjectsample/im_0027_bak - copy.dcm.small.png', FullImage: '../assets/InternProjectsample/im_0027_bak - copy_full.png', Id: 15},
    {ThumbImage: '../assets/InternProjectsample/im_0028_bak - copy.dcm.small.png', FullImage: '../assets/InternProjectsample/im_0028_bak - copy_full.png', Id: 16},
    {ThumbImage: '../assets/InternProjectsample/im_0028_bak - copy.dcm.small.png', FullImage: '../assets/InternProjectsample/im_0029_bak - copy_full.png', Id: 17},
    {ThumbImage: '../assets/InternProjectsample/im_0030_bak - copy.dcm.small.png', FullImage: '../assets/InternProjectsample/im_0030_bak - copy_full.png', Id: 18},
    {ThumbImage: '../assets/InternProjectsample/im_0031_bak - copy.dcm.small.png', FullImage: '../assets/InternProjectsample/im_0031_bak - copy_full.png', Id: 19},
    {ThumbImage: '../assets/InternProjectsample/im_0032_bak - copy.dcm.small.png', FullImage: '../assets/InternProjectsample/im_0032_bak - copy_full.png', Id: 20},
    {ThumbImage: '../assets/InternProjectsample/im_0033_bak - copy.dcm.small.png', FullImage: '../assets/InternProjectsample/im_0033_bak - copy_full.png', Id: 21},
    {ThumbImage: '../assets/InternProjectsample/im_0034_bak - copy.dcm.small.png', FullImage: '../assets/InternProjectsample/im_0034_bak - copy_full.png', Id: 22},
    {ThumbImage: '../assets/InternProjectsample/im_0035_bak - copy.dcm.small.png', FullImage: '../assets/InternProjectsample/im_0035_bak - copy_full.png', Id: 23},
    {ThumbImage: '../assets/InternProjectsample/im_0036_bak - copy.dcm.small.png', FullImage: '../assets/InternProjectsample/im_0036_bak - copy_full.png', Id: 24},
    {ThumbImage: '../assets/InternProjectsample/im_0038_bak - copy.dcm.small.png', FullImage: '../assets/InternProjectsample/im_0038_bak - copy_full.png', Id: 25},
    {ThumbImage: '../assets/InternProjectsample/im_0038_bak - copy.dcm.small.png', FullImage: '../assets/InternProjectsample/im_0038_bak - copy_full.png', Id: 26},
    {ThumbImage: '../assets/InternProjectsample/im_0039_bak - copy.dcm.small.png', FullImage: '../assets/InternProjectsample/im_0039_bak - copy_full.png', Id: 27},
    {ThumbImage: '../assets/InternProjectsample/im_0040_bak - copy.dcm.small.png', FullImage: '../assets/InternProjectsample/im_0040_bak - copy_full.png', Id: 28}




    ];
  }


GetSmallImages = () => {
    return this.ImageSourceArray.map(p => {
      return {Id: p.Id, Thumb: p.ThumbImage};
    });
  }
  GetFullImage = (id: number) => {
    return this.ImageSourceArray.filter(p => p.Id == id).map(p => p.FullImage);
  }

GetImageIDs(): Observable<InstanceModel[]>{
    return this.http.get<InstanceModel[]>(this.GetIDsUrl);
}
GetImage(ImageId: InstanceModel): Observable<Blob> {
  return this.http.get(this.GetImageUrl + ImageId.Id,{responseType:'blob'});


}

}
