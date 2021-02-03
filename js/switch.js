import {Moves} from "./moves.js";
import { KING, QUEEN, ROOK, KNIGHT, BISHOP, PAWN } from "./strings.js";

export function switchMoves(piece, position, isWhite) {
    switch (piece) {
        case KING:
            return Moves.king(position);
        case QUEEN:
            return Moves.queen(position);
        case ROOK:
            return Moves.king(position);
        case KNIGHT:
            return Moves.knight(position);
        case BISHOP:
            return Moves.bishop(position);
        case PAWN:
            return Moves.pawn(position, isWhite);
    }
}