class Moves {
    static king(position) {
        let list = [];
        for (i = -1; i <= 1; i++) {
            for (j = -1; j <= 1; j++) {
                if (i != 0 && j != 0) {
                    list.push(Position(position.x + i, position.y + j));
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
        for (i = 1; i <= 8; i++) {
            list.push(Position(position.x, i));
            list.push(Position(i, position.y));
        }
        return list;
    }

    static bishop(position) {
        let list = [];
        for (i = -8; i <= 8; i++) {
            for (j = -8; i <= 8; i++) {
                if (i == j) {
                    list.push(Position(position.x + i, position.y + j));
                }
            }
        }
        return list;
    }

    static knight() {
        let list = [];
        for (i = -2; i <= 2; i++) {
            for (j = -2; i <= 2; i++) {
                if (i != j && i != -j && i != 0 && j != 0) {
                    list.push(Position(position.x + i, position.y + j));
                }
            }
        }
        return list;
    }

    static pawn(position, isWhite) {
        let list = [];
        if (isWhite) {
            list.push(Position(position.x, position.y + 1));
        } else {
            list.push(Position(position.x, position.y - 1));
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