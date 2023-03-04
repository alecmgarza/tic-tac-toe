const Gameboard = (() => {
    let gameboard = [];

    function renderMarks() {
        for (i = 0; i < gameboard.length; i++) {
            const boardSquare = document.getElementById(i);
            boardSquare.textContent = Gameboard.gameboard[i];
            if (boardSquare.textContent == player1.mark) {
                boardSquare.style.color = '#306844';
            } else {
                boardSquare.style.color = '#950101';
            }
        }
    }

    return {gameboard, renderMarks};
})();

const Player = (name, mark, turn) => {

    return {name, mark, turn};
};

const player1 = Player('Player 1', 'x', true);
const player2 = Player('Player 2', 'o', false);

const game = (() => {

    const startButton = document.getElementById('start');
    const restartButton = document.getElementById('restart');
    const modal = document.getElementById('modal');
    const gameboard = document.getElementById('gameboard');
    const boardSquares = document.getElementsByClassName('board-squares');
    const submit = document.getElementById('submit');
    const winMessage = document.querySelector('h2');

    startButton.onclick = () => {
        startButton.style.display = 'none';
        restartButton.style.display = 'block';
        modal.style.display = 'block';    
    }

    restartButton.onclick = () => {
        startButton.style.display = 'block';
        restartButton.style.display = 'none';
        Gameboard.gameboard = '';
        Gameboard.renderMarks();
        winMessage.textContent = '';
    }

    submit.onclick = () => {
        modal.style.display = 'none';
    }

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    const namePlayer1 = () => {   
        const p1Hub = document.getElementById('p1-hub-name'); 
        player1.name = document.getElementById('p1-name').value;
        p1Hub.textContent = player1.name;
    };

    const namePlayer2 = () => {
        const p2Hub = document.getElementById('p2-hub-name');
        player2.name = document.getElementById('p2-name').value;
        p2Hub.textContent = player2.name;
    }

    const createPlayers = () => {
        submit.onclick = () => {
            modal.style.display = 'none';

            namePlayer1();
            namePlayer2();
            markBoard();
        }
    }

    const player1Turn = () => {
        player1.turn = true;
        console.log(`It's ${player1.name}'s turn!`)
        player2.turn = false;
    };

    const player2Turn = () => {
        player1.turn = false;
        console.log(`It's ${player2.name}'s turn!`)
        player2.turn = true;
    }

    const takeTurns = () => {
        gameboard.onclick = () => {
            if (player1.turn) {
                player2Turn();
            } else {
                player1Turn();
            }
        }
    };

    const markBoard = () => {
        for (let i = 0; i < boardSquares.length; i++) {
            const boardSquare = boardSquares[i];
            boardSquare.onclick = () => {
                if (player1.turn) {
                    Gameboard.gameboard[i] = player1.mark;
                } else {
                    Gameboard.gameboard[i] = player2.mark;
                }
                Gameboard.renderMarks();
                endGame();
            }
        }
    };

    const endGame = () => {
        
        if (Gameboard.gameboard[0,1,2] || 
            Gameboard.gameboard[3,4,5] || 
            Gameboard.gameboard[6,7,8] || 
            Gameboard.gameboard[0,3,6] ||
            Gameboard.gameboard[1,4,7] ||
            Gameboard.gameboard[2,5,8] ||
            Gameboard.gameboard[0,4,8] ||
            Gameboard.gameboard[2,4,6] == 'x') {

            winMessage.textContent = `${player1.name} wins!`;

        } else if (Gameboard.gameboard[0,1,2] || 
            Gameboard.gameboard[3,4,5] || 
            Gameboard.gameboard[6,7,8] || 
            Gameboard.gameboard[0,3,6] ||
            Gameboard.gameboard[1,4,7] ||
            Gameboard.gameboard[2,5,8] ||
            Gameboard.gameboard[0,4,8] ||
            Gameboard.gameboard[2,4,6] == 'o') {
            
            winMessage.textContent = `${player2.name} wins!`;

        }
    }

    return {takeTurns, createPlayers};
})();

game.createPlayers();
game.takeTurns();

/* 
Bugs:
Player can change the mark of a spot on the board to their own.

Still need:
- Display wins.
- Style page.
*/