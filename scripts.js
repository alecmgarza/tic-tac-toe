const Gameboard = (() => {
    let gameboard = [];

    const gameboardContent = () => {
        const gameboard = document.createElement('div');
        gameboard.setAttribute('id', 'gameboard');
        document.body.appendChild(gameboard);
        document.body.insertBefore(gameboard, document.body.firstChild);

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

const boardSquare = document.getElementById('gameboard');


const game = (() => {
    const markBoard = () => {
        for (let i = 0; i < Gameboard.gameboard.length; i++) {
            return Gameboard.gameboard[i];
        };
    };

    const createPlayer = () => {

    };

    const startButton = document.getElementById('start');
    const restartButton = document.getElementById('restart');
    const boardSquare = document.getElementsByClassName('board-square');

    startButton.onclick = () => {
        startButton.style.display = 'none';
        restartButton.style.display = 'block';
        player1Turn();    
    }

    restartButton.onclick = () => {
        startButton.style.display = 'block';
        restartButton.style.display = 'none';
    }

    const player1Turn = () => {
        player1.turn = true;
        player2.turn = false;
        boardSquare.onclick = () => {
            console.log('It is player 2 turn');
            player2Turn();
        }
        
    };

    const player2Turn = () => {
        player2.turn = true;
        player1.turn = false;
        boardSquare.onclick = () => {
            player1Turn();
        }
    }

    Gameboard.gameboardContent(markBoard());

    return {markBoard};
})();

const Player = (name, mark, turn) => {

    const startButton = document.getElementById('start');
    const modal = document.getElementById('modal');

    startButton.onclick = () => {
        modal.style.display = 'block';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    return {name, mark, turn};
}

const player1 = Player('Player1', 'x', true);
const player2 = Player('Player2', 'o', false);

/* 
Things to do:
Figure out why onclick does not trigger player turn function (boardSquare not being recognized)
*/