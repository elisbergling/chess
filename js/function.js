import { pieces } from "./main.js";
import { Piece } from "./piece.js";
import { KING } from "./strings.js";

export function validMoves(positions, position, isWhite) {
    positions.forEach((pos) => {
        if (pos.x < 1 || pos.y < 1 || pos.x > 8 || pos.y > 8 || (position.x == pos.x && position.y == pos.y)) {
            positions = positions.filter(position => position !== pos);
        }
        pieces.forEach((piece) => {
            if (pos.x == piece.position.x && pos.y == piece.position.y && isWhite == piece.isWhite) {
                positions = positions.filter(position => position !== pos);
            }
        });
    });
    if (isCheck(pieces)) {
        let newPieces = pieces;
        let piece = newPieces.find(piece => piece.position.x == position.x && piece.position.y == position.y);
        newPieces = newPieces.filter(piece => piece.position !== position);
        positions.forEach((pos) => {
            let testPiece = new Piece(pos, piece.img, piece.piece, piece.isWhite);
            newPieces.push(testPiece);
            if (isCheck(newPieces)) {
                positions = positions.filter(position => pos.x == position.x && pos.y == position.y);
            }
            newPieces = newPieces.filter(piece => piece !== testPiece);
        });
    }
    
    return positions;
}

export function isCheck(testPieces) {
    let isCheck = false;
    let blackKing = testPieces.find(piece => !piece.isWhite && piece.piece == KING);
    let whiteKing = testPieces.find(piece => piece.isWhite && piece.piece == KING);
    testPieces.forEach((piece) => {
        if (piece.isWhite) {
            piece.moves().forEach(move => {
                if (move.x == blackKing.position.x && move.y == blackKing.position.y) {
                    isCheck = true;
                }
            });
        } else {
            piece.moves().forEach(move => {
                if (move.x == whiteKing.position.x && move.y == whiteKing.position.y) {
                    isCheck = true;
                }
            });
        }
    });
    return isCheck;
}