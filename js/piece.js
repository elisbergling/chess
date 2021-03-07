"use strict";
import {switchMoves} from "./switch.js";

export class Piece {
  constructor(position, img, piece, isWhite) {
    this.position = position;
    this.img = img;
    this.piece = piece;
    this.isWhite = isWhite;
  }

  moves() {
    return switchMoves(this.piece, this.position, this.isWhite);
  }
}