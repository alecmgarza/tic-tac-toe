const Gameboard = (() => {
    let gameboard = [ "x", "o", "x", "o", "x", "o", "x", "o", "x"];

    const gameboardContent = () => {
        const gameboard = document.createElement('div');
        gameboard.setAttribute('id', 'gameboard');
        document.body.appendChild(gameboard);

        for (let i = 0; i <= 8; i++) {
            let boardSquare = document.createElement('div');
            boardSquare.setAttribute('class', 'board-square');
            boardSquare.setAttribute('id', i);
            gameboard.appendChild(boardSquare);
            boardSquare.textContent = Gameboard.gameboard[i];
        };
    };

    return {gameboard, gameboardContent};
})();

const game = (() => {
    const markBoard = () => {
        for (let i = 0; i < Gameboard.gameboard.length; i++) {
            return Gameboard.gameboard[i];
        };
    };

    /*const createPlayer = () => {

    };

    const startGame = () => {

    };

    const playerTurn = () => {

    };*/

    Gameboard.gameboardContent(markBoard());

    return {markBoard};
})();

const Player = (name, mark) => {

    return {name, mark};
}

const player1 = Player('Player1', 'x');
const player2 = Player('Player2', 'o');