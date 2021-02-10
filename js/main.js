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
            let square = (i + j) % 2 != 0 ?
                `<div class="white" id="${j} + ${i}"></div>` : `<div class="black" id="${j} + ${i}"></div>`
            document.querySelector("#board").innerHTML += square;
        }
    }
}

let pieces = [];

function generatePieces() {
    for (let i = 1; i <= 8; i++) {
        pieces.push(new Piece(new Position(i, 7), "../assets/white pawn.png", PAWN, false));
        pieces.push(new Piece(new Position(i, 2), "../assets/black pawn.png", PAWN, true));
    }
    pieces.push(new Piece(new Position(1, 8), "../assets/white rook.png", ROOK));
    pieces.push(new Piece(new Position(8, 8), "../assets/white rook.png", ROOK));
    pieces.push(new Piece(new Position(1, 1), "../assets/black rook.png", ROOK));
    pieces.push(new Piece(new Position(8, 1), "../assets/black rook.png", ROOK));
    pieces.push(new Piece(new Position(2, 8), "../assets/white knight.png", KNIGHT));
    pieces.push(new Piece(new Position(7, 8), "../assets/white knight.png", KNIGHT));
    pieces.push(new Piece(new Position(2, 1), "../assets/black knight.png", KNIGHT));
    pieces.push(new Piece(new Position(7, 1), "../assets/black knight.png", KNIGHT));
    pieces.push(new Piece(new Position(6, 8), "../assets/white bishop.png", BISHOP));
    pieces.push(new Piece(new Position(3, 8), "../assets/white bishop.png", BISHOP));
    pieces.push(new Piece(new Position(6, 1), "../assets/black bishop.png", BISHOP));
    pieces.push(new Piece(new Position(3, 1), "../assets/black bishop.png", BISHOP));
    pieces.push(new Piece(new Position(5, 8), "../assets/white queen.png", QUEEN));
    pieces.push(new Piece(new Position(5, 1), "../assets/black queen.png", QUEEN));
    pieces.push(new Piece(new Position(4, 8), "../assets/white king.png", KING));
    pieces.push(new Piece(new Position(4, 1), "../assets/black king.png", KING));
    pieces.forEach(piece => {
        let squere = document.getElementById(`${piece.position.x} + ${piece.position.y}`);
        squere.innerHTML = `<img src="${piece.img}" alt="${piece.position.x}">`;
        squere.addEventListener("click", function () {moves(piece);});
    });
}

function moves(piece) {
    piece.moves.forEach((move) => {
        document.getElementById(`${move.x} + ${move.y}`).innerHTML += `<div class="dot"></div>`;
    });
}