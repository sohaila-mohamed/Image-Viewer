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



  constructor(private _interaction: InteractionsService, private service: DataService, private domSanitizer: DomSanitizer) {

   }

  ngOnInit() {
    this._interaction.BigImage$.subscribe(massage => {console.log('From main viewer'); this.ImageID = massage;
                                                      this.service.GetFullImage(this.ImageID)
    .subscribe(data => {
    // this.BigImageSource = this.domSanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(data));
    this.BigImageSource = this.domSanitizer.sanitize(SecurityContext.RESOURCE_URL, this.domSanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(data)));
    console.log('Image Request From Angular', this.BigImageSource, typeof(this.BigImageSource));


    const myCanvas = <HTMLCanvasElement> document.getElementById('my-canvas');
    const myContext = myCanvas.getContext('2d');
    const img = new Image();

    img.src = this.BigImageSource;
    img.onload = () => {
      const imgWidth = img.width;
      const imgHeight = img.height;
      myCanvas.width = imgWidth;
      myCanvas.height = imgHeight;
      myContext.drawImage(img, 0, 0, imgWidth, imgHeight);

      };

      //get pixels array
    const imageData = myContext.getImageData(0, 0, myCanvas.width, myCanvas.height);
    for (let i = 0; i <= imageData.data.length; i++){
      imageData.data[i] = 1;

    }
    myContext.putImageData(imageData, 0, 0);
    console.log(imageData.data);

  });




  });



  }
//   const context  = <HTMLCanvasElement> document.getElementById('canvas');
//   const ctx = context.getContext('2d');
// const img = new Image();
// img.src = "this.BigImageSource" ;
// img.onload = function () {
// ctx.drawImage(img, 300, 100);
// }


}
