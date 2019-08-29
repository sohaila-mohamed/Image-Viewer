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

  myCanvas : HTMLCanvasElement;
  myContext : CanvasRenderingContext2D;
  img : HTMLImageElement;


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
    this.img = new Image();


    this._interaction.GrayFilter$.subscribe(massage => {this.grayscale(); console.log("recived"); });
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
      this.drawrectangle();


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
            const avg: number = 0;
            arr[i] = avg;   //red
            arr[i + 1] = avg; //green
            arr[i + 2] = avg; //blue
        }

    ImgData.data.set(arr);
    this.myContext.putImageData(ImgData, 0, 0);
    console.log("after", ImgData.data);


  }

  drawrectangle(){
    //ctx.beginPath();
    //ctx.rect(188, 50, 200, 100);
    //ctx.stroke();

    // get the canvas's position on the page
    let canvas = this.myCanvas;
    let ctx = this.myContext;
    let img = this.img;
    let canvasx = canvas.getBoundingClientRect().left;
    let canvasy = canvas.getBoundingClientRect().top;
    console.log("x", canvasx);
    console.log("y", canvasy);
    // set up variables to hold the mouse starting X/Y
    // when the user drags the mouse
    let startX = 0;
    let startY = 0;
    let mouseX = 0;
    let mouseY = 0;
    let AspectRatio = img.naturalWidth / img.naturalHeight;
    // indicate whether the user is dragging the mouse
    let isDragging = false;
    // listen for mousedown, call handleMouseDown when it’s pressed

    document.getElementById('my-canvas').onmousedown = function(e){handleMouseDown(e); };

   // listen for mouseup, call handleMouseUp when it’s released

    document.getElementById('my-canvas').onmouseup = function(e){handleMouseUp(e); };

   // listen for mouse movements, call handleMouseMove when the mouse moves

    document.getElementById('my-canvas').onmousemove = function(e){handleMouseMove(e); };

   // called when user presses the mouse button down
// This is the start of a drag

    function handleMouseDown(e){

      // calculate the mouse position relative to the canvas


      mouseX = e.clientX - canvasx;
      mouseY = e.clientY - canvasy;
      console.log("x2", e.clientX);
      console.log("y2", e.clientY);

      // store the starting mouse position

      startX = mouseX;
      startY = mouseY;

      // set isDragging to indicate we’re starting a drag.

      isDragging = true;
    }

    // called when the user releases the mouse button,

    function handleMouseUp(e){

      // the drag is over, clear the isDragging flag
      mouseX = e.clientX - canvasx;
      mouseY = e.clientY - canvasy;
      isDragging = false;
    console.log("startx", startX);
    console.log("starty", startY);
    console.log("mousex", mouseX);
    console.log("mousey", mouseY);
    crop(startX, startY, mouseX - startX, mouseY - startY, AspectRatio);

    }

    // called repeatedly when the user drags the mouse

    function handleMouseMove(e) {

  // calculate the mouse position relative to the canvas

  mouseX = e.clientX - canvasx;
  mouseY = e.clientY - canvasy;
  let width = mouseX - startX;
  let height = mouseY - startY;


  // if the user isn’t dragging, just exit

  if ( !isDragging ){ return; }




    // clear the canvas in preparation for drawing a modified square/rectangle
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // call a function that draws a rectangle

    drawRectangle(startX, startY, width, height);





    }


    function drawRectangle(startX, startY, width, height){



    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'red';
    ctx.rect(startX, startY, width, height);
    ctx.stroke();



    }
    function crop(startX, startY, width, height, AspectRatio){
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, startX, startY, width, height, 0, 0, canvas.width, canvas.height );

    }













    // let canvas = canvas;
    // let ctx =ctx;
    //
    // let last_mousex = 0;
    // let last_mousey = 0;
    // let mousex = 0;
    // let mousey = 0;
    // let mousedown = false;

    // //Mousedown
    // document.getElementById('my-canvas').addEventListener('mousedown', function(e) {
    //     last_mousex = Math.round(e.clientX - canvasx);
    //     last_mousey = Math.round(e.clientY - canvasy);
    //     mousedown = true;
    // });

    // //Mouseup
    // document.getElementById('my-canvas').addEventListener('mouseup', function(e) {
    //     mousedown = false;
    // });

    // //Mousemove
    // document.getElementById('my-canvas').addEventListener('mousemove', function(e) {
    //     mousex = Math.round(e.clientX - canvasx);
    //     mousey = Math.round(e.clientY - canvasy);
    //     console.log("x", mousex);
    //     console.log("y", mousey);
    //     if (mousedown) {
    //           ctx.clearRect(0, 0, canvas.width, canvas.height); //clear canvas
    //           ctx.beginPath();
    //           var width = mousex - last_mousex;
    //           var height = mousey - last_mousey;
    //           ctx.rect(last_mousex, last_mousey, width, height);
    //           ctx.strokeStyle = 'black';
    //           ctx.lineWidth = 10;
    //           ctx.stroke();
    //     }
    //     //Output
    //     document.getElementById('output').innerHTML =
    //     ('current: ' + mousex + ', ' + mousey + '<br/>last: ' + last_mousex + ', ' + last_mousey + '<br/>mousedown: ' + mousedown);
    // });



  }








}
