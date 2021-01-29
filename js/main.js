


function startGame() {
    generateSquares();
    generatePieces();
}

function generateSquares() {
    document.querySelector("main").innerHTML = `<div id="board"></div>`;
    for (i = 0; i < 8; i++) {
        for (j = 0; j < 8; j++) {
            let square = (i + j) % 2 == 0 ?
                `<div class="white"></div>` : `<div class="black"></div>`
            document.querySelector("#board").innerHTML += square;
        }
    }
    document.querySelector("button").outerHTML = `<div></div>`;
}

let pieces = [];

function generatePieces() {
    for (let i = 1; i <= 8; i++) {
        pieces.push(Piece(Position(i, 7), ''), Moves.pawn(Position(i, 7), false));
        pieces.push(Piece(Position(i, 2), ''), Moves.pawn(Position(i, 2), true));
    }
    document.querySelector("main").innerHTML += `<div id="pieces"></div>`;
    pieces.forEach(piece => {
        document.querySelector("#pieces").innerHTML += `<div class="piece"></div>`; // ändra
    });
}