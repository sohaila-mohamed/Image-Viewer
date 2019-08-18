

export class Image{
  sscr: string;
  bscr: string;
  private Id?: number;
  static IdGenerator: number = 0;
  constructor(){
    this.Id = Image.IdGenerator + 1;
    Image.IdGenerator = Image.IdGenerator + 1;
  }

}
