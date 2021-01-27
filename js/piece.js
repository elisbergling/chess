class Piece {
    constructor(position, img, moves) {
      this.position = position;
      this.img  = img;
      this.moves = moves;
    }

    get moves() {
        return this.moves();
    }
  }