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

    Gameboard.gameboardContent(markBoard());

    return {markBoard};
})();

const Player = (name) => {
    const markBoard = () => {
        let boardSquare = document.getElementsByClassName('board-square');
        if (Player.name == 'Player1') {
            boardSquare.onclick = () => {
                Gameboard.gameboard.push('x');
            }
        } else if (Player.name == 'Player2') {
            boardSquare.onclick = () => {
                Gameboard.gameboard.push('o');
            }
        }
    }

    return {name, markBoard};
}

const player1 = Player('Player1');
const player2 = Player('Player2');

console.log(player1.name);
console.log(player2.name);