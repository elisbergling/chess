"use strict";
import {Moves} from "./moves.js";
import { KING, QUEEN, ROOK, KNIGHT, BISHOP, PAWN } from "./strings.js";

export let hasWhiteRigthRookMoved = false;
export let hasWhiteLeftRookMoved = false;
export let hasBlackRigthRookMoved = false;
export let hasBlackLeftRookMoved = false;
export let hasWhiteKingMoved = false;
export let hasBlackKingMoved = false;

export function resetHasMovedValues() {
    hasWhiteRigthRookMoved = false;
    hasWhiteLeftRookMoved = false;
    hasBlackRigthRookMoved = false;
    hasBlackLeftRookMoved = false;
    hasWhiteKingMoved = false;
    hasBlackKingMoved = false;
}

export function switchMoves(piece, position, isWhite) {
    switch (piece) {
        case KING:
            return Moves.king(position, isWhite);
        case QUEEN:
            return Moves.queen(position, isWhite);
        case ROOK:
            return Moves.rook(position, isWhite);
        case KNIGHT:
            return Moves.knight(position, isWhite);
        case BISHOP:
            return Moves.bishop(position, isWhite);
        case PAWN:
            return Moves.pawn(position, isWhite);
    }
}

export function switchWhichRook(piece) {
    if(piece.isWhite) {
        switch (piece.position.x) {
            case 1:
                hasWhiteLeftRookMoved = true;
                break;
            case 8:
                hasWhiteRigthRookMoved = true;
                break;
            default:
                break;
        }
    } else {
        switch (piece.position.x) {
            case 1:
                hasBlackLeftRookMoved = true;
                break;
            case 8:
                hasBlackRigthRookMoved = true;
                break;
            default:
                break;
        }
    }
}

export function switchWhichKing(piece) {
    switch (piece.position.y) {
        case 8:
            hasWhiteKingMoved = true;
            break;
        case 1:
            hasBlackKingMoved = true;
            break;
        default:
            break;
    }
}