import { onBoard } from "./function.js";
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
        return onBoard(list);
    }

    static queen(position) {
        let list = this.rook(position).concat(this.bishop(position));
        return onBoard(list);
    }

    static rook(position) {
        let list = [];
        for (let i = 1; i <= 8; i++) {
            list.push(new Position(position.x, i));
            list.push(new Position(i, position.y));
        }
        return onBoard(list);
    }

    static knight(position) {
        let list = [];
        for (let i = -2; i <= 2; i++) {
            for (let j = -2; j <= 2; j++) {
                if (i != j && i != -j && i != 0 && j != 0) {
                    list.push(new Position(position.x + i, position.y + j));
                }
            }
        }
        return onBoard(list);
    }

    static bishop(position) {
        let list = [];
        for (let i = -8; i <= 8; i++) {
            for (let j = -8; j <= 8; j++) {
                if (i == j) {
                    list.push(new Position(position.x + i, position.y + j));
                }
            }
        }
        return onBoard(list);
    }

    static pawn(position, isWhite) {
        let list = [];
        if (isWhite) {
            list.push(new Position(position.x, position.y + 1));
        } else {
            list.push(new Position(position.x, position.y - 1));
        }
        return onBoard(list);
    }
}