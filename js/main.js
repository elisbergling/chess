import {Piece} from "./piece.js";
import {Position} from "./position.js";
import { KING, QUEEN, ROOK, KNIGHT, BISHOP, PAWN } from "./strings.js";

document.querySelector("#startGame").addEventListener("click", startGame);

function startGame() {
    generateSquares();
    generatePieces();
}

function generateSquares() {
    document.querySelector("main").innerHTML = `<div id="board"></div>`;
    for (let i = 1; i <= 8; i++) {
        for (let j = 1; j <= 8; j++) {
            let square = (i + j) % 2 == 0 ?
                `<div class="white" id=${i, j}></div>` : `<div class="black" id=${i, j}></div>`
            document.querySelector("#board").innerHTML += square;
        }
    }
}

let pieces = [];

function generatePieces() {
    for (let i = 1; i <= 8; i++) {
        pieces.push(new Piece(new Position(i, 7), "", PAWN, false));
        pieces.push(new Piece(new Position(i, 2), "", PAWN, true));
    }
    pieces.forEach(piece => {
        document.getElementById(`${piece.position.x, piece.position.y}`).innerHTML = `<img src="${piece.img}" alt="En pjäs">`;
    });
}