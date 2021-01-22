class Moves {
    static king() {

    }

    static queen() {

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
        let minsta;
        position.x <= position.y ? minsta = position.x : minsta = position.y;
        for (i = 1; i <= 8 - minsta; i++) {
            list.push(Position(position.x + i, position.y + i));
        }
        list.forEach((pos) => { if (pos.x < 1 || pos.y < 1) { list = list.filter(item => item === pos) } });
        return list;
    }

    static knight() {

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
}