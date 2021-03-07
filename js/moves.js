"use strict";
import { validMoves, testPieces, newPieces, first, setNewPieces } from "./function.js";
import { Position } from "./position.js";
import { pieces, moves, setPieces } from "./main.js";
import { Piece } from "./piece.js";
import { QUEEN } from "./strings.js";
import { hasWhiteLeftRookMoved, hasWhiteRigthRookMoved, hasBlackLeftRookMoved, hasBlackRigthRookMoved, hasWhiteKingMoved, hasBlackKingMoved } from "./switch.js";

export class Moves {
    static king(position, isWhite) {
        let list = [];
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                list.push(new Position(position.x + i, position.y + j));
            }
        }
        if (!hasWhiteKingMoved && isWhite) {
            if (!hasWhiteRigthRookMoved) {
                let canCastle = true;
                pieces.forEach(piece => {
                    if (piece.position.y == position.y && piece.position.x > position.x && piece.position.x < 8) {
                        canCastle = false;
                    }
                });
                if (canCastle) {
                    list.push(new Position(position.x + 2, position.y));
                }
            }
            if (!hasWhiteLeftRookMoved) {
                let canCastle = true;
                pieces.forEach(piece => {
                    if (piece.position.y == position.y && piece.position.x < position.x && piece.position.x > 1) {
                        canCastle = false;
                    }
                });
                if (canCastle) {
                    list.push(new Position(position.x - 2, position.y));
                }
            }
        }
        if (!hasBlackKingMoved && !isWhite) {
            if (!hasBlackRigthRookMoved) {
                let canCastle = true;
                pieces.forEach(piece => {
                    if (piece.position.y == position.y && piece.position.x > position.x && piece.position.x < 8) {
                        canCastle = false;
                    }
                });
                if (canCastle) {
                    list.push(new Position(position.x + 2, position.y));
                }
            }
            if (!hasBlackLeftRookMoved) {
                let canCastle = true;
                pieces.forEach(piece => {
                    if (piece.position.y == position.y && piece.position.x < position.x && piece.position.x > 1) {
                        canCastle = false;
                    }
                });
                if (canCastle) {
                    list.push(new Position(position.x - 2, position.y));
                }
            }
        }

        return validMoves(list, position, isWhite);
    }

    static queen(position, isWhite) {
        let list = this.rook(position).concat(this.bishop(position));
        return validMoves(list, position, isWhite);
    }

    static rook(position, isWhite) {
        let list = [];
        for (let i = 1; i <= 8; i++) {
            list.push(new Position(position.x, i));
            list.push(new Position(i, position.y));
        }
        testPieces().forEach(piece => {
            list.forEach(pos => {
                if (piece.position.x == pos.x && piece.position.y == pos.y) {
                    if (position.x > piece.position.x) {
                        list = list.filter(po => piece.position.x <= po.x);
                    } else if (position.x < piece.position.x) {
                        list = list.filter(po => piece.position.x >= po.x);
                    }
                    if (position.y > piece.position.y) {
                        list = list.filter(po => piece.position.y <= po.y);
                    } else if (position.y < piece.position.y) {
                        list = list.filter(po => piece.position.y >= po.y);
                    }
                }
            });
        });
        return validMoves(list, position, isWhite);
    }

    static knight(position, isWhite) {
        let list = [];
        for (let i = -2; i <= 2; i++) {
            for (let j = -2; j <= 2; j++) {
                if (i != j && i != -j && i != 0 && j != 0) {
                    list.push(new Position(position.x + i, position.y + j));
                }
            }
        }
        return validMoves(list, position, isWhite);
    }

    static bishop(position, isWhite) {
        let list = [];
        for (let i = -8; i <= 8; i++) {
            for (let j = -8; j <= 8; j++) {
                if (i == j || i == - j) {
                    list.push(new Position(position.x + i, position.y + j));
                }
            }
        }
        testPieces().forEach(piece => {
            list.forEach(pos => {
                if (piece.position.x == pos.x && piece.position.y == pos.y) {
                    if (position.x > piece.position.x && position.y > piece.position.y) {
                        list = list.filter(po => piece.position.x <= po.x || piece.position.y <= po.y);
                    } else if (position.x > piece.position.x && position.y < piece.position.y) {
                        list = list.filter(po => piece.position.x <= po.x || piece.position.y >= po.y);
                    } else if (position.x < piece.position.x && position.y > piece.position.y) {
                        list = list.filter(po => piece.position.x >= po.x || piece.position.y <= po.y);
                    } else if (position.x < piece.position.x && position.y < piece.position.y) {
                        list = list.filter(po => piece.position.x >= po.x || piece.position.y >= po.y);
                    }
                }
            });
        });
        return validMoves(list, position, isWhite);
    }

    static pawn(position, isWhite) {
        let list = [];
        if (isWhite) {
            list.push(new Position(position.x, position.y - 1));
            if (position.y == 7) {
                list.push(new Position(position.x, position.y - 2));
            }
            if (position.y == 1) {
                if (first) {
                    let newPiece = new Piece(position, "assets/whitequeen.png", QUEEN, true);
                    let copiedPieces = [...pieces];
                    copiedPieces = copiedPieces.filter(piece => piece.position !== position);
                    copiedPieces.push(newPiece)
                    setPieces(copiedPieces);
                    let square = document.getElementById(`${newPiece.position.x} + ${newPiece.position.y}`);
                    square.innerHTML = `<img src="${newPiece.img}" alt="${newPiece.piece}">`;
                    square.onclick = function () { moves(newPiece); };
                } else {
                    let newPiece = new Piece(position, "assets/whitequeen.png", QUEEN, true);
                    let copiedPieces = [...newPieces];
                    copiedPieces = copiedPieces.filter(piece => piece.position !== position);
                    copiedPieces.push(newPiece)
                    setNewPieces(copiedPieces);
                }
            }
            testPieces().forEach(piece => {
                if (piece.position.y == position.y - 1 && piece.position.x == position.x - 1) {
                    list.push(new Position(position.x - 1, position.y - 1));
                }
                if (piece.position.y == position.y - 1 && piece.position.x == position.x + 1) {
                    list.push(new Position(position.x + 1, position.y - 1));
                }
                if (piece.position.y == position.y - 1 && piece.position.x == position.x) {
                    list = list.filter(pos => !(pos.y == position.y - 1 && pos.x == position.x));
                    list = list.filter(pos => !(pos.y == position.y - 2 && pos.x == position.x));
                }
                if (piece.position.y == position.y - 2 && piece.position.x == position.x) {
                    list = list.filter(pos => !(pos.y == position.y - 2 && pos.x == position.x));
                }
            });
        } else {
            list.push(new Position(position.x, position.y + 1));
            if (position.y == 2) {
                list.push(new Position(position.x, position.y + 2));
            }
            if (position.y == 8) {
                if (first) {
                    let newPiece = new Piece(position, "assets/blackqueen.png", QUEEN, false);
                    let copiedPieces = [...pieces];
                    copiedPieces = copiedPieces.filter(piece => piece.position !== position);
                    copiedPieces.push(newPiece)
                    setPieces(copiedPieces);
                    let square = document.getElementById(`${newPiece.position.x} + ${newPiece.position.y}`);
                    square.innerHTML = `<img src="${newPiece.img}" alt="${newPiece.piece}">`;
                    square.onclick = function () { moves(newPiece); };
                } else {
                    let newPiece = new Piece(position, "assets/blackqueen.png", QUEEN, false);
                    let copiedPieces = [...newPieces];
                    copiedPieces = copiedPieces.filter(piece => piece.position !== position);
                    copiedPieces.push(newPiece)
                    setNewPieces(copiedPieces);
                }
            }
            testPieces().forEach(piece => {
                if (piece.position.y == position.y + 1 && piece.position.x == position.x - 1) {
                    list.push(new Position(position.x - 1, position.y + 1));
                }
                if (piece.position.y == position.y + 1 && piece.position.x == position.x + 1) {
                    list.push(new Position(position.x + 1, position.y + 1));
                }
                if (piece.position.y == position.y + 1 && piece.position.x == position.x) {
                    list = list.filter(pos => !(pos.y == position.y + 1 && pos.x == position.x));
                    list = list.filter(pos => !(pos.y == position.y + 2 && pos.x == position.x));
                }
                if (piece.position.y == position.y + 2 && piece.position.x == position.x) {
                    list = list.filter(pos => !(pos.y == position.y + 2 && pos.x == position.x));
                }
            });
        }
        return validMoves(list, position, isWhite);
    }
}