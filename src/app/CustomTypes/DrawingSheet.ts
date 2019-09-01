
export interface ISVGDrawingSheet {
   svg: any;
   startX: number;
   startY: number;
   endX: number;
   endY: number;
   drawingWidth: number;
   drawingHeight: number;
   calculateWidthAndHeight(ex, ey, sx, sy);


}
export class SVGDrawingSheet implements  ISVGDrawingSheet{
  public svg: any;
  public startX: number;
  public startY: number;
  public endX: number;
  public endY: number;
  public drawingWidth: number;
  public drawingHeight: number;
  public constructor() {
  this.startX = 0;
  this.svg = 0;
  this.startX = 0;
  this.startY = 0;
  this.endX = 0;
  this.endY = 0;
  this.drawingWidth = 0;
  this.drawingHeight = 0;
  }
  public calculateWidthAndHeight(ex, ey, sx, sy){
    console.log(ex);
    console.log(sy);
    this.drawingWidth = Math.abs(ex - sx);
    this.drawingHeight = Math.abs(ey - sy);
  }


}

export interface CanvasDrawingSheet {
  positionX: number;
  positionY: number;
  width: number;
  height: number;
}

