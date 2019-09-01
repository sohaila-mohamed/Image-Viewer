import { Component, OnInit, ViewChild, SecurityContext } from '@angular/core';
import { InteractionsService } from 'src/app/interactions.service';
import { DataService } from 'src/app/Data.service';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { SVGDrawingSheet } from '../../CustomTypes/DrawingSheet';
declare const SVG: any;

@Component({
  selector: 'app-main-viewer',
  templateUrl: './main-viewer.component.html',
  styleUrls: ['./main-viewer.component.css']
})
export class MainViewerComponent implements OnInit {
  ImageID: string;
  BigImageSource: string;
  Mode: string;

  myCanvas: HTMLCanvasElement;
  myContext: CanvasRenderingContext2D;
  img: HTMLImageElement;
  cropx: number;
  cropy: number;
  SVGElement: SVGDrawingSheet = new SVGDrawingSheet();



  constructor(private _interaction: InteractionsService, private service: DataService, private domSanitizer: DomSanitizer) {

   }

  ngOnInit() {
    this._interaction.BigImage$.subscribe(massage => {console.log('From main viewer'); this.ImageID = massage;
                                                      this.service.GetFullImage(this.ImageID)
    .subscribe(data => {
    // this.BigImageSource = this.domSanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(data));
    this.BigImageSource = this.domSanitizer.sanitize(
      SecurityContext.RESOURCE_URL, this.domSanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(data)));
    console.log('Image Request From Angular', this.BigImageSource, typeof(this.BigImageSource));

    this.myCanvas = document.getElementById('my-canvas') as HTMLCanvasElement;
    this.myContext = this.myCanvas.getContext('2d');
    this.cropx = this.myCanvas.getBoundingClientRect().left;
    this.cropy = this.myCanvas.getBoundingClientRect().top;
    console.log('cxx', this.cropx);
    console.log('cyy', this.cropy);
    this.img = new Image();





    this._interaction.GrayFilter$.subscribe(massage => {this.grayscale(); console.log('recived'); });

    this._interaction.EditMode$.subscribe(massage => {this.Mode = massage; console.log('mode in viewer', this.Mode); });
    this.LoadImage();
    this.CropMode(this.SVGElement);








  });




  });




  }


  CropMode(SVGSheet){

    SVGSheet.svg = new SVG('svg');
    let rect = SVGSheet.svg.rect().draw();
    SVGSheet.svg.on('mousedown', function(event) {
    rect.draw(event);
    console.log('down');
    SVGSheet.startX=event.clientX;
    SVGSheet.startY= event.clientY;
    console.log('sx', SVGSheet.startX);
    console.log('sy', SVGSheet.startY);

});
    this.SVGElement.svg.on('mouseup', function(event) {
  rect.draw('stop', event);
  // console.log("up");
  // console.log(event.clientY);
  SVGSheet.endX = event.clientX;
  SVGSheet.endY = event.clientY;
  console.log('ex', SVGSheet.endX);
  console.log('ey', SVGSheet.endY);
  SVGSheet.calculateWidthAndHeight(SVGSheet.endX, SVGSheet.endY,SVGSheet.startX,SVGSheet.startY);
  console.log('w', SVGSheet.drawingWidth);
  console.log('h', SVGSheet. drawingHeight);
  // console.log('cropx', SVGSheet.cropx);
  // console.log('cropy', SVGSheet.cropy);

});
    rect.on('drawstop', function() {

  // remove listener



});








  }









  LoadImage() {

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

  grayscale() {
    console.log('on Gray');
    let ImgData = this.myContext.getImageData(0, 0, this.myCanvas.width, this.myCanvas.height);
    let arr = ImgData.data;
    console.log('before', ImgData.data);
    for (let i = 0; i < arr.length; i = i + 4) {
            const ttl = arr[i] + arr[i + 1] + arr[i + 2];

            // tslint:disable-next-line: radix
            const avg: number = 0;
            arr[i] = avg;   //red
            arr[i + 1] = avg; //green
            arr[i + 2] = avg; //blue
        }

    ImgData.data.set(arr);
    this.myContext.putImageData(ImgData, 0, 0);
    console.log('after', ImgData.data);


  }

//   public Crop() {
//     //ctx.beginPath();
//     //ctx.rect(188, 50, 200, 100);
//     //ctx.stroke();

//     // get the canvas's position on the page
//     let mode = this.Mode;
//     let canvas = this.myCanvas;
//     let ctx = this.myContext;
//     let img = this.img;
//     let canvasx = canvas.getBoundingClientRect().left;
//     let canvasy = 73;
//     console.log('x', canvasx);
//     console.log('y', canvasy);
//     // set up variables to hold the mouse starting X/Y
//     // when the user drags the mouse

//     let AspectRatio = img.naturalWidth / img.naturalHeight;
//     // indicate whether the user is dragging the mouse
//     let isDragging = false;
//     // listen for mousedown, call handleMouseDown when it’s pressed

//     document.getElementById('my-canvas').onmousedown = function(e) {handleMouseDown(e); };

//    // listen for mouseup, call handleMouseUp when it’s released

//     document.getElementById('my-canvas').onmouseup = function(e) {handleMouseUp(e); };

//    // listen for mouse movements, call handleMouseMove when the mouse moves

//     document.getElementById('my-canvas').onmousemove = function(e) {handleMouseMove(e); };

//    // called when user presses the mouse button down
// // This is the start of a drag

//     function handleMouseDown(e) {

//       // calculate the mouse position relative to the canvas


//       mouseX = e.clientX - canvasx;
//       mouseY = e.clientY - canvasy;
//       console.log('x2', e.clientX);
//       console.log('y2', e.clientY);

//       // store the starting mouse position

//       SVGElement.startX = mouseX;
//       SVGElement.startY = mouseY;

//       // set isDragging to indicate we’re starting a drag.

//       isDragging = true;
//     }

//     // called when the user releases the mouse button,

//     function handleMouseUp(e) {

//       // the drag is over, clear the isDragging flag
//       mouseX = e.clientX - canvasx;
//       mouseY = e.clientY - canvasy;
//       width = mouseX - SVGElement.startX;
//       height = mouseY - SVGElement.startY;


//       isDragging = false;
//       console.log('SVGElement.startX', SVGElement.startX);
//       console.log('SVGElement.startY', SVGElement.startY);
//       console.log('mousex', mouseX);
//       console.log('mousey', mouseY);
//       if (width > 0) {
//       ApplyCropping(SVGElement.startX, SVGElement.startY, width, height, AspectRatio);

//     }


//     }

//     // called repeatedly when the user drags the mouse

//     function handleMouseMove(e) {

//   // calculate the mouse position relative to the canvas

//   mouseX = e.clientX - canvasx;
//   mouseY = e.clientY - canvasy;
//   width = mouseX - SVGElement.startX;
//   height = mouseY - SVGElement.startY;
//   console.log('width', width);
//   console.log ('height', height);


//   // if the user isn’t dragging, just exit

//   if ( !isDragging ) { return; }



//   if (width > 0) {
//       // clear the canvas in preparation for SVGElement.svg a modified square/rectangle
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

//     // call a function that draws a rectangle

//     drawRectangle(SVGElement.startX, SVGElement.startY, width, height);

//     }






//     }


//     function drawRectangle(SVGElement.startX, SVGElement.startY, width, height) {



//     ctx.beginPath();
//     ctx.lineWidth = 3;
//     ctx.strokeStyle = 'red';
//     ctx.rect(SVGElement.startX, SVGElement.startY, width, height);
//     ctx.stroke();



//     }
//     function ApplyCropping(SVGElement.startX, SVGElement.startY, width, height, AspectRatio) {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       ctx.drawImage(img, SVGElement.startX, SVGElement.startY, width, height, 0, 0, canvas.width, canvas.height );

//     }


//   }

  Zoom() {

    // listen for mousedown, call handleMouseDown when it’s pressed

    document.getElementById('my-canvas').onmousedown = function(e) {ZhandleMouseDown(e); };

   // listen for mouseup, call handleMouseUp when it’s released

    document.getElementById('my-canvas').onmouseup = function(e) {ZhandleMouseUp(e); };

   // listen for mouse movements, call handleMouseMove when the mouse moves

    document.getElementById('my-canvas').onmousemove = function(e) {ZhandleMouseMove(e); };

   // called when user presses the mouse button down

    function ZhandleMouseMove(e) {
     console.log('ZMove');

   }
    function ZhandleMouseUp(e) {
    console.log('ZUp');

  }
    function ZhandleMouseDown(e) {
    console.log('ZDown');

  }
  }








}
