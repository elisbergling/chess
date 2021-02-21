import {Moves} from "./moves.js";
import { KING, QUEEN, ROOK, KNIGHT, BISHOP, PAWN } from "./strings.js";

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