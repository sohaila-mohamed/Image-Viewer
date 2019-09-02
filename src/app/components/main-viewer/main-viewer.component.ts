import { Component, OnInit, ViewChild, SecurityContext } from '@angular/core';
import { InteractionsService } from 'src/app/interactions.service';
import { DataService } from 'src/app/Data.service';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { SVGDrawingSheet, CanvasDrawingSheet } from '../../CustomTypes/DrawingSheet';
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
  img: HTMLImageElement;
  SVGElement: SVGDrawingSheet = new SVGDrawingSheet();
  CanvasElement:CanvasDrawingSheet = new CanvasDrawingSheet();




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
    this.CanvasElement.Canvas = document.getElementById('my-canvas') as HTMLCanvasElement;
    this.CanvasElement.Context = this.CanvasElement.Canvas.getContext('2d');
    this.CanvasElement.positionX= this.CanvasElement.Canvas.getBoundingClientRect().left;
    this.CanvasElement.positionY = Math.abs(this.CanvasElement.Canvas.getBoundingClientRect().top);
    this.img = new Image();
    this.SVGElement.svg = new SVG('svg');





    this._interaction.GrayFilter$.subscribe(massage => {this.grayscale(); console.log('recived'); });

    this._interaction.EditMode$.subscribe(massage => {this.Mode = massage; console.log('mode in viewer', this.Mode);
                                                      if (this.Mode == 'crop') {this.CallSelectArea(); }



    });
    this.LoadImage();











  });




  });




  }


  CallSelectArea() {
    this.SelectArea(this.SVGElement,this.CanvasElement,this.img);
  }

  ApplyCropping(){
    console.log(this);
  }


  SelectArea(SVGSheet,CanvasSheet,img)  {

    let rect = SVGSheet.svg.rect().attr({
      fill: 'transparent'
    , stroke: '#000'
    , 'stroke-width': 10
    });

    SVGSheet.svg.on('mousedown', function(event) {
    rect.draw(event);
    console.log('down');
    SVGSheet.startX = event.clientX;
    SVGSheet.startY = event.clientY;
    console.log('sx',event.clientX);
    console.log('sy', event.clientY);

});
    this.SVGElement.svg.on('mouseup', function(event) {
    rect.draw('stop', event);
  // console.log("up");
  // console.log(event.clientY);
    SVGSheet.endX = event.clientX;
    SVGSheet.endY = event.clientY;
    console.log('ex', SVGSheet.endX);
    console.log('ey', SVGSheet.endY);
    SVGSheet.calculateWidthAndHeight(SVGSheet.endX, SVGSheet.endY, SVGSheet.startX, SVGSheet.startY);
    console.log('w', SVGSheet.drawingWidth);
    console.log('h', SVGSheet. drawingHeight);
    console.log("clear");
    rect.remove();
    crop();


});
rect.on('drawstop', function(){
  // remove listener
});



function crop(){
  CanvasSheet.cropX=SVGSheet.startX-CanvasSheet.positionX;
  CanvasSheet.cropY=SVGSheet.startY-76;
  console.log( "cx",CanvasSheet.cropX);
  console.log("cy",CanvasSheet.cropY);
  console.log( "px",CanvasSheet.positionX);
  console.log("py",CanvasSheet.positionY);
  const aspect = img.naturalWidth / img.naturalHeight;
  CanvasSheet.Context.drawImage(img, CanvasSheet.cropX, CanvasSheet.cropY, SVGSheet.drawingWidth, SVGSheet.drawingHeight, 0, 0, CanvasSheet.Canvas.width, CanvasSheet.Canvas.height );
  console.log(CanvasSheet.cropX, CanvasSheet.cropY, SVGSheet.drawingWidth,  SVGSheet.drawingWidth/aspect, 0, 0, CanvasSheet.Canvas.width, CanvasSheet.Canvas.height);
}






  }











  LoadImage() {

    this.img.src = this.BigImageSource;
    this.img.onload = () => {
      const imgWidth = this.img.width;
      const imgHeight = this.img.height;
      this.CanvasElement.Canvas.width = imgWidth;
      this.CanvasElement.Canvas.height = imgHeight;
      this.CanvasElement.Context.drawImage(this.img, 0, 0, imgWidth, imgHeight);





      };

  }

  grayscale() {
    console.log('on Gray');
    let ImgData = this.CanvasElement.Context.getImageData(0, 0, this.CanvasElement.Canvas.width, this.CanvasElement.Canvas.height);
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
    this.CanvasElement.Context.putImageData(ImgData, 0, 0);
    console.log('after', ImgData.data);


  }

//   public SelectArea() {
//     //ctx.beginPath();
//     //ctx.rect(188, 50, 200, 100);
//     //ctx.stroke();

//     // get the canvas's position on the page
//     let mode = this.Mode;
//     let canvas = this.CanvasElement.Canvas;
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
