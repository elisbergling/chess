"use strict";
import { isCheck, isCheckMate, isStaleMate, resetValues} from "./function.js";
import { Piece } from "./piece.js";
import { Position } from "./position.js";
import { KING, QUEEN, ROOK, KNIGHT, BISHOP, PAWN } from "./strings.js";
import { switchWhichRook, switchWhichKing, resetHasMovedValues } from "./switch.js";

document.querySelector("#game").addEventListener("click", startGame);

function startGame() {
    generateSquares();
    generatePieces();
}

function endGame() {
    document.querySelector("main").innerHTML = `<div id="game"><p>End Game</p></div>`;
    pieces = [];
    status = "Nothing";
    selectedPiece = null;
    whiteTurn = true;
    resetValues();
    resetHasMovedValues();
    startGame();
}

function generateSquares() {
    document.querySelector("main").innerHTML += `<div id="board"></div>`;
    document.querySelector("main").innerHTML += `<div id="status"><p>Hej</p></div>`;
    for (let i = 1; i <= 8; i++) {
        for (let j = 1; j <= 8; j++) {
            let square = (i + j) % 2 == 0 ?
                `<div class="white" id="${j} + ${i}"></div>` : `<div class="black" id="${j} + ${i}"></div>`
            document.querySelector("#board").innerHTML += square;
        }
    }
    document.querySelector("#game").innerHTML = `<p>End Game</p>`
    document.querySelector("#game").addEventListener("click", endGame);
    updateStatus();
}

export function setPieces(newPieces) {
    pieces = newPieces;
}

export let pieces = [];
export let selectedPiece = null;
export let whiteTurn = true;
let status = "Nothing";

function generatePieces() {
    for (let i = 1; i <= 8; i++) {
        pieces.push(new Piece(new Position(i, 7), "../assets/white pawn.png", PAWN, true));
        pieces.push(new Piece(new Position(i, 2), "../assets/black pawn.png", PAWN, false));
    }
    pieces.push(new Piece(new Position(1, 8), "../assets/white rook.png", ROOK, true));
    pieces.push(new Piece(new Position(8, 8), "../assets/white rook.png", ROOK, true));
    pieces.push(new Piece(new Position(1, 1), "../assets/black rook.png", ROOK, false));
    pieces.push(new Piece(new Position(8, 1), "../assets/black rook.png", ROOK, false));
    pieces.push(new Piece(new Position(2, 8), "../assets/white knight.png", KNIGHT, true));
    pieces.push(new Piece(new Position(7, 8), "../assets/white knight.png", KNIGHT, true));
    pieces.push(new Piece(new Position(2, 1), "../assets/black knight.png", KNIGHT, false));
    pieces.push(new Piece(new Position(7, 1), "../assets/black knight.png", KNIGHT, false));
    pieces.push(new Piece(new Position(6, 8), "../assets/white bishop.png", BISHOP, true));
    pieces.push(new Piece(new Position(3, 8), "../assets/white bishop.png", BISHOP, true));
    pieces.push(new Piece(new Position(6, 1), "../assets/black bishop.png", BISHOP, false));
    pieces.push(new Piece(new Position(3, 1), "../assets/black bishop.png", BISHOP, false));
    pieces.push(new Piece(new Position(4, 8), "../assets/white queen.png", QUEEN, true));
    pieces.push(new Piece(new Position(4, 1), "../assets/black queen.png", QUEEN, false));
    pieces.push(new Piece(new Position(5, 8), "../assets/white king.png", KING, true));
    pieces.push(new Piece(new Position(5, 1), "../assets/black king.png", KING, false));
    pieces.forEach(piece => {
        let square = document.getElementById(`${piece.position.x} + ${piece.position.y}`);
        square.innerHTML = `<img src="${piece.img}" alt="${piece.piece}">`;
        square.onclick = function () { moves(piece); };
    });
}

export function moves(piece) {
    document.querySelectorAll('.dot').forEach((d) => { d.remove() });
    if (whiteTurn == piece.isWhite && selectedPiece != piece) {
        piece.moves().forEach((move) => {
            let square = document.getElementById(`${move.x} + ${move.y}`);
            square.innerHTML += `<div class="dot" id="dot${move.x}${move.y}"></div>`;
            document.getElementById(`dot${move.x}${move.y}`).addEventListener("click", function () { movePiece(new Position(move.x, move.y)); });
        });
        selectedPiece = piece;
    } else {
        selectedPiece = null;
    }
}

function movePiece(position) {
    document.getElementById(`${selectedPiece.position.x} + ${selectedPiece.position.y}`).innerHTML = ``;
    document.querySelectorAll('.dot').forEach((d) => { d.remove() });
    updatePieces(position);
    checks(position);
    whiteTurn = !whiteTurn;
    selectedPiece = null;
}

function updatePieces(position) {
    pieces = pieces.filter(element => element !== selectedPiece && (element.position.x !== position.x || element.position.y !== position.y));
    let newPiece = new Piece(position, selectedPiece.img, selectedPiece.piece, selectedPiece.isWhite);
    pieces.push(newPiece);
    let id = `piece${position.x}${position.y}`;
    document.getElementById(`${position.x} + ${position.y}`).innerHTML = `<img src="${newPiece.img}" alt="${newPiece.piece} id="${id}">`
    document.getElementById(`${position.x} + ${position.y}`).onclick = function () { moves(newPiece); };
    document.getElementById(`${selectedPiece.position.x} + ${selectedPiece.position.y}`).onclick = function () { };
}
function checks(position) {
    let isCheck1 = isCheck(pieces);
    let isCheckMate1 = isCheckMate(pieces);
    let isStaleMate1 = isStaleMate(pieces);
    if (isCheckMate1.is) {
        if (isCheckMate1.isWhite) {
            status = "Check mate on white";
            updateStatus();
        } else {
            status = "Check mate on black";
            updateStatus();
        }
    } else if (isCheck1.is) {
        console.log("CHECK");
        if (isCheck1.isWhite) {
            console.log("WHITE");
            status = "Check on white";
            updateStatus();
        } else {
            console.log("BLACK");
            status = "Check on black";
            updateStatus();
        }
    } else if (isStaleMate1.is) {
        if (isStaleMate1.isWhite) {
            status = "White in stale mate";
            updateStatus();
        } else {
            status = "Black in stale mate";
            updateStatus();
        }
    }
    else {
        status = "Nothing";
        updateStatus();
    }
    if (selectedPiece.piece == ROOK) {
        switchWhichRook(selectedPiece);
    } else if (selectedPiece.piece == KING) {
        switchWhichKing(selectedPiece);
    }

    if (selectedPiece.piece == KING && (selectedPiece.position.x == position.x - 2 || selectedPiece.position.x == position.x + 2)) {
        castle(position);
    }
}

function castle(position) {
    let newRookPosition;
    let oldRookPosition;
    if (selectedPiece.isWhite) {
        if (selectedPiece.position.x == position.x - 2) {
            newRookPosition = new Position(6, 8);
            oldRookPosition = new Position(8, 8);
        } else if (selectedPiece.position.x == position.x + 2) {
            newRookPosition = new Position(4, 8);
            oldRookPosition = new Position(1, 8);
        }
    } else {
        if (selectedPiece.position.x == position.x - 2) {
            newRookPosition = new Position(6, 1);
            oldRookPosition = new Position(8, 1);
        } else if (selectedPiece.position.x == position.x + 2) {
            newRookPosition = new Position(4, 1);
            oldRookPosition = new Position(1, 1);
        }
    }
    document.getElementById(`${oldRookPosition.x} + ${oldRookPosition.y}`).innerHTML = ``;
    document.getElementById(`${oldRookPosition.x} + ${oldRookPosition.y}`).onclick = function () { };
    pieces = pieces.filter(element => !(element.piece == ROOK && element.position.x == oldRookPosition.x && element.position.y == oldRookPosition.y));
    let newPiece = new Piece(newRookPosition, selectedPiece.isWhite ? "../assets/white rook.png" : "../assets/black rook.png", ROOK, selectedPiece.isWhite);
    pieces.push(newPiece);
    let id = `piece${newRookPosition.x}${newRookPosition.y}`;
    document.getElementById(`${newRookPosition.x} + ${newRookPosition.y}`).innerHTML = `<img src="${newPiece.img}" alt="${ROOK} id="${id}">`
    document.getElementById(`${newRookPosition.x} + ${newRookPosition.y}`).onclick = function () { moves(newPiece); };
}

function updateStatus() {
    document.getElementById("status").innerHTML = `<p>Status: ${status}</p>`;
}