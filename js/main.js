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