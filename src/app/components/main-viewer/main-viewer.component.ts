import { Component, OnInit, ViewChild, SecurityContext } from '@angular/core';
import { InteractionsService } from 'src/app/interactions.service';
import { DataService } from 'src/app/Data.service';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-main-viewer',
  templateUrl: './main-viewer.component.html',
  styleUrls: ['./main-viewer.component.css']
})
export class MainViewerComponent implements OnInit {
  ImageID: string;
  BigImageSource: string;

  myCanvas :HTMLCanvasElement;
  myContext :CanvasRenderingContext2D;
  img :HTMLImageElement;


  constructor(private _interaction: InteractionsService, private service: DataService, private domSanitizer: DomSanitizer) {

   }

  ngOnInit() {
    this._interaction.BigImage$.subscribe(massage => {console.log('From main viewer'); this.ImageID = massage;
                                                      this.service.GetFullImage(this.ImageID)
    .subscribe(data => {
    // this.BigImageSource = this.domSanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(data));
    this.BigImageSource = this.domSanitizer.sanitize(SecurityContext.RESOURCE_URL, this.domSanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(data)));
    console.log('Image Request From Angular', this.BigImageSource, typeof(this.BigImageSource));

    this.myCanvas = <HTMLCanvasElement> document.getElementById('my-canvas');
    this.myContext = this.myCanvas.getContext('2d');
    this.img=new Image();
    this.LoadImage();















  });




  });




  }
  LoadImage(){
    this.img.src = this.BigImageSource;
    this.img.onload = () => {
      const imgWidth = this.img.width;
      const imgHeight = this.img.height;
      this.myCanvas.width = imgWidth;
      this.myCanvas.height = imgHeight;
      const aspect = this.img.naturalWidth / this.img.naturalHeight;
      this.myContext.drawImage(this.img, 0, 0, imgWidth, imgHeight);

      };

  }

  grayscale(){
    console.log("on Gray");
      let ImgData = this.myContext.getImageData(0, 0, this.myCanvas.width, this.myCanvas.height);
      let arr = ImgData.data;
      console.log("before", ImgData.data);
      for (let i = 0; i < arr.length; i = i + 4){
            const ttl = arr[i] + arr[i + 1] + arr[i + 2];

            // tslint:disable-next-line: radix
            const avg: number = Math.round (ttl / 3);
            arr[i] = avg;   //red
            arr[i + 1] = avg; //green
            arr[i + 2] = avg; //blue
        }

      ImgData.data.set(arr);
      this.myContext.putImageData(ImgData, 0, 0);
      console.log("after", ImgData.data);


  }







}
