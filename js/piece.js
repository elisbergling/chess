class Piece {
    constructor(position, img, moves) {
      this.position = position;
      this.img  = img;
      this.moves = moves;
    }

    get moves() {
        return this.moves();
    }
  
    get area() {
      return this.calcArea();
    }
  
    calcArea() {
      return this.height * this.width;
    }
  }