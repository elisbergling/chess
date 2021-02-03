import {switchMoves} from "./switch.js";

export class Piece {
  constructor(position, img, piece, isWhite) {
    console.log(position.x, position.y);
    this.position = position;
    this.img = img;
    this.moves = switchMoves(piece, position, isWhite);
  }
}