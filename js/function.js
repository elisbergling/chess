"use strict";
import { CheckReturnType } from "./check_return_type.js";
import { pieces, whiteTurn, selectedPiece } from "./main.js";
import { Piece } from "./piece.js";
import { KING, PAWN } from "./strings.js";

export let first = true;
export let newPieces = [];
let isStaleMateCheck = false;

export function setNewPieces(newerPieces) {
    newPieces = newerPieces;
}

export function resetValues() {
    first = true;
    newPieces = [];
}

export function testPieces() {
    if (first) {
        return pieces;
    } else {
        return newPieces;
    }
}

export function validMoves(positions, position, isWhite) {
    positions.forEach((pos) => {
        if (pos.x < 1 || pos.y < 1 || pos.x > 8 || pos.y > 8 || (position.x == pos.x && position.y == pos.y)) {
            positions = positions.filter(position => position !== pos);
        }
        testPieces().forEach((piece) => {
            if (pos.x == piece.position.x && pos.y == piece.position.y && isWhite == piece.isWhite) {
                positions = positions.filter(position => position !== pos);
            }
        });
    });
    if (first) {
        first = false;
        newPieces = [...pieces];
        let newPositions = [...positions];
        let currentPiece = newPieces.find(piece => piece.position.x == position.x && piece.position.y == position.y);
        newPieces = newPieces.filter(piece => currentPiece != piece);
        positions.forEach((futurePosition) => {
            let gonePiece = newPieces.find(piece => piece.position.x == futurePosition.x && piece.position.y == futurePosition.y);
            if (gonePiece != undefined) {
                newPieces = newPieces.filter(piece => !(piece == gonePiece && piece.piece != KING));
            }
            let testPiece = new Piece(futurePosition, currentPiece.img, currentPiece.piece, currentPiece.isWhite);
            newPieces.push(testPiece);
            let isCheck1 = isCheck(newPieces);
            if (isStaleMateCheck) {
                if ((isCheck1.is) || (isCheck1.isWhite && isCheck1.isBlack)) {
                    newPositions = newPositions.filter(position => futurePosition !== position);
                }
            } else {
                if ((isCheck1.is && isCheck1.isWhite == whiteTurn) || (isCheck1.isWhite && isCheck1.isBlack)) {
                    newPositions = newPositions.filter(position => futurePosition !== position);
                }
            }
            newPieces = newPieces.filter(piece => piece != testPiece);
            if (gonePiece != undefined && gonePiece.piece != KING) {
                newPieces.push(gonePiece);
            }

        });
        positions = [...newPositions];
        first = true;
    }
    return positions;
}

export function isCheck(testPieces) {
    let isCheck = false;
    let isWhite = false;
    let isBlack = false;
    let blackKing = testPieces.find(piece => !piece.isWhite && piece.piece == KING);
    let whiteKing = testPieces.find(piece => piece.isWhite && piece.piece == KING);
    testPieces.forEach((piece) => {
        if (piece.isWhite) {
            piece.moves().forEach(move => {
                if (move.x == blackKing.position.x && move.y == blackKing.position.y) {
                    isCheck = true;
                    isBlack = true;
                }
            });
        } else {
            piece.moves().forEach(move => {
                if (move.x == whiteKing.position.x && move.y == whiteKing.position.y) {
                    isCheck = true;
                    isWhite = true;
                }
            });
        }
    });
    return new CheckReturnType(isCheck, isWhite, isBlack);
}

export function isStaleMate(testPieces) {
    console.log("StaleMate");
    let whiteMoves = 0;
    let blackMoves = 0;
    let isStaleMate = false;
    let isWhite = false;
    let isBlack = false;
    isStaleMateCheck = true;
    testPieces.forEach(piece => {
        if (piece.isWhite) {
            whiteMoves += piece.moves().length;
        } else {
            blackMoves += piece.moves().length;
        }
    });
    isStaleMateCheck = false;
    if (whiteMoves == 0 || blackMoves == 0) {
        isStaleMate = true;
        if (whiteMoves == 0) {
            isWhite = true;
        }
        if (blackMoves == 0) {
            isBlack = true;
        }
    }
    console.log(whiteMoves);
    console.log(blackMoves);
    return new CheckReturnType(isStaleMate, isWhite, isBlack);
}
// && !(piece.piece == PAWN && (piece.position.x == move.x + 1 || piece.position.x == move.x + 2) && piece.position.y == move.y)
export function isCheckMate(testPieces) {
    console.log("CheckMate");
    let isCheckMate = false;
    let isCheck1 = isCheck(testPieces);
    let isStaleMate1 = isStaleMate(testPieces);
    let isWhite = false;
    let isBlack = false;
    if (isCheck1.is && isStaleMate1.is && (isCheck1.isWhite && isStaleMate1.isWhite || isCheck1.isBlack && isStaleMate1.isBlack)) {
        isCheckMate = true;
        if (isCheck1.isWhite && isStaleMate1.isWhite) {
            isWhite = true;
        }
        if (isCheck1.isBlack && isStaleMate1.isBlack) {
            isBlack = true;
        }
    }
    return new CheckReturnType(isCheckMate, isWhite, isBlack);
}