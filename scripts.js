const body = document.getElementsByName('body');

const gameboard = (() => {
    let gameboard = [ "x", "o", "x", "o", "x", "o", "x", "o", "x"];

    const board = document.createElement('div');
    board.setAttribute('id', 'gameboard');
    document.body.appendChild(board);

    for (i = 1; i <= 9; i++) {
        let boardSquare = document.createElement('div');
        boardSquare.setAttribute('class', 'board-square');
        boardSquare.setAttribute('id', i);
        board.appendChild(boardSquare);
    }

    return {gameboard};
})();