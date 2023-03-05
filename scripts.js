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

const Player = (name, mark, wins, turn) => {

    return {name, mark, wins, turn};
};

const player1 = Player('Player 1', 'x', 0, true);
const player2 = Player('Player 2', 'o', 0, false);

const game = (() => {

    const startButton = document.getElementById('start');
    const restartButton = document.getElementById('restart');
    const modal = document.getElementById('modal');
    const gameboard = document.getElementById('gameboard');
    const boardSquares = document.getElementsByClassName('board-squares');
    const submit = document.getElementById('submit');
    const victoryMessage = document.getElementById('victory-message');
    const p1Wins = document.getElementById('p1-wins');
    const p2Wins = document.getElementById('p2-wins');

    startButton.onclick = () => {
        startButton.style.display = 'none';
        restartButton.style.display = 'block';
        modal.style.display = 'block';    
    }

    restartButton.onclick = () => {
        startButton.style.display = 'block';
        restartButton.style.display = 'none';
        Gameboard.gameboard = [];
        Gameboard.renderMarks();
        victoryMessage.textContent = '';
    }

    submit.onclick = () => {
        modal.style.display = 'none';
        takeTurns();
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
        
        if (Gameboard.gameboard[0] && Gameboard.gameboard[1] && Gameboard.gameboard[2] == 'x' || 
            Gameboard.gameboard[3] && Gameboard.gameboard[4] && Gameboard.gameboard[5] == 'x' || 
            Gameboard.gameboard[6] && Gameboard.gameboard[7] && Gameboard.gameboard[8] == 'x' || 
            Gameboard.gameboard[0] && Gameboard.gameboard[3] && Gameboard.gameboard[6] == 'x' ||
            Gameboard.gameboard[1] && Gameboard.gameboard[4] && Gameboard.gameboard[7] == 'x' ||
            Gameboard.gameboard[2] && Gameboard.gameboard[5] && Gameboard.gameboard[8] == 'x' ||
            Gameboard.gameboard[0] && Gameboard.gameboard[4] && Gameboard.gameboard[8] == 'x' ||
            Gameboard.gameboard[2] && Gameboard.gameboard[4] && Gameboard.gameboard[6] == 'x') {

            victoryMessage.textContent = `${player1.name} wins!`;
            player1.wins += 1;
            p1Wins.textContent = `Wins: ${player1.wins}`;

        } else if (Gameboard.gameboard[0] && Gameboard.gameboard[1] && Gameboard.gameboard[2] == 'o' || 
            Gameboard.gameboard[3] && Gameboard.gameboard[4] && Gameboard.gameboard[5] == 'o' || 
            Gameboard.gameboard[6] && Gameboard.gameboard[7] && Gameboard.gameboard[8] == 'o' || 
            Gameboard.gameboard[0] && Gameboard.gameboard[3] && Gameboard.gameboard[6] == 'o' ||
            Gameboard.gameboard[1] && Gameboard.gameboard[4] && Gameboard.gameboard[7] == 'o' ||
            Gameboard.gameboard[2] && Gameboard.gameboard[5] && Gameboard.gameboard[8] == 'o' ||
            Gameboard.gameboard[0] && Gameboard.gameboard[4] && Gameboard.gameboard[8] == 'o' ||
            Gameboard.gameboard[2] && Gameboard.gameboard[4] && Gameboard.gameboard[6] == 'o') {
            
            victoryMessage.textContent = `${player2.name} wins!`;
            player2.wins += 1;
            p2Wins.textContent = `Wins: ${player2.wins}`

        }
    }

    return {takeTurns, createPlayers};
})();

game.createPlayers();

/* 
Bugs:
- Player can change the mark of a spot on the board to their own.
- Winning parameters are triggering incorrectly.
- Players can trigger takeTurns function by clicking the gameboard before a game has started.
- Restart button not centered.

Still need:
- Display wins.
- Style modal.
*/