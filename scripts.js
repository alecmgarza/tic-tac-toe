const Gameboard = (() => {
    let gameboard = [];

    const gameboardContent = () => {

        for (let i = 0; i <= 8; i++) {
            let boardSquare = document.createElement('div');
            boardSquare.setAttribute('class', 'board-square');
            boardSquare.setAttribute('id', i);
            gameboard.appendChild(boardSquare);
            boardSquare.textContent = Gameboard.gameboard[i];
        };
    };

    return {gameboard};
})();

const boardSquare = document.getElementById('gameboard');


const game = (() => {
    const markBoard = () => {
        for (let i = 0; i < Gameboard.gameboard.length; i++) {
            return Gameboard.gameboard[i];
        };
    };

    const createPlayer = () => {
        const player1 = Player('Player 1', 'x', true);
        const player2 = Player('Player 2', 'o', false);
    };

    const startButton = document.getElementById('start');
    const restartButton = document.getElementById('restart');
    const modal = document.getElementById('modal');
    const boardSquare = document.getElementsByClassName('board-square');
    const submit = document.getElementById('submit');

    startButton.onclick = () => {
        startButton.style.display = 'none';
        restartButton.style.display = 'block';
        modal.style.display = 'block';
        player1Turn();    
    }

    restartButton.onclick = () => {
        startButton.style.display = 'block';
        restartButton.style.display = 'none';
    }

    submit.onclick = () => {
        modal.style.display = 'none';
    }

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
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

    return {markBoard, createPlayer};
})();

const Player = (name, mark, turn) => {

    return {name, mark, turn};
}

const player1 = Player('Player 1', 'x', true);
const player2 = Player('Player 2', 'o', false);

/* 
Things to do:
Why doesn't onclick trigger player turn function? (boardSquare not being recognized)
How do I create a player and assign their name to an input value?
*/