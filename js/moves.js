import {Position} from "./position.js";

export class Moves {
    static king(position) {
        let list = [];
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i != 0 && j != 0) {
                    list.push(new Position(position.x + i, position.y + j));
                }
            }
        }
    }

    static queen(position) {
        let list = this.rook(position).concat(this.bishop(position));
        return list;
    }

    static rook(position) {
        let list = [];
        for (let i = 1; i <= 8; i++) {
            list.push(new Position(position.x, i));
            list.push(new Position(i, position.y));
        }
        return list;
    }

    static knight() {
        let list = [];
        for (let i = -2; i <= 2; i++) {
            for (let j = -2; i <= 2; i++) {
                if (i != j && i != -j && i != 0 && j != 0) {
                    list.push(new Position(position.x + i, position.y + j));
                }
            }
        }
        return list;
    }

    static bishop(position) {
        let list = [];
        for (let i = -8; i <= 8; i++) {
            for (let j = -8; i <= 8; i++) {
                if (i == j) {
                    list.push(new Position(position.x + i, position.y + j));
                }
            }
        }
        return list;
    }

    

    static pawn(position, isWhite) {
        let list = [];
        if (isWhite) {
            list.push(new Position(position.x, position.y + 1));
        } else {
            list.push(new Position(position.x, position.y - 1));
        }
        return list;
    }

    onBoard(positions) {
        positions.forEach((position) => {
            if (position.x <= 0 || position.y <= 0) {
                positions = positions.filter(item => item === position);
            }
        });
        return positions;
    }
}