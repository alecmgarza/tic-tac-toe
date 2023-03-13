const Gameboard = (() => {
    let gameboard = [];

    function renderMarks() {
        gameboard.length = 9;
        for (i = 0; i < gameboard.length; i++) {
            const boardSquares = document.getElementsByClassName('board-squares');
            const boardSquare = boardSquares[i];
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
    const playAgain = document.getElementById('play-again');
    const modal = document.getElementById('modal');
    const gameboard = document.getElementById('gameboard');
    const boardSquares = document.getElementsByClassName('board-squares');
    const submit = document.getElementById('submit');
    const infoMessage = document.getElementById('info-message');
    const p1Wins = document.getElementById('p1-wins');
    const p2Wins = document.getElementById('p2-wins');
    const p1HubName = document.getElementById('p1-hub-name');
    const p2HubName = document.getElementById('p2-hub-name');

    startButton.onclick = () => {
        startButton.style.display = 'none';
        restartButton.style.display = 'inline-block';
        modal.style.display = 'block'; 
        player1.turn = true;
        player2.turn = false;
        createPlayers();  
    }

    restartButton.onclick = () => {
        window.location.reload();
    }

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    const namePlayer1 = () => {   
        const p1Hub = document.getElementById('p1-hub-name'); 
        if (document.getElementById('p1-name').value == '') {
            player1.name = 'Player 1';
        } else {
            player1.name = document.getElementById('p1-name').value;
        }
        p1Hub.textContent = player1.name;
    };

    const namePlayer2 = () => {
        const p2Hub = document.getElementById('p2-hub-name');
        if (document.getElementById('p2-name').value == '') {
            player2.name = 'Player 2';
        } else {
            player2.name = document.getElementById('p2-name').value;
        }
        p2Hub.textContent = player2.name;
    }

    const createPlayers = () => {
        submit.onclick = () => {
            modal.style.display = 'none';
            p1HubName.style.textDecoration = 'underline';
            
            namePlayer1();
            namePlayer2();
            markBoard();
        }
    }

    const player1Turn = () => {
        player1.turn = true;
        player2.turn = false;
        p1HubName.style.textDecoration = 'underline';
        p2HubName.style.textDecoration = 'none';
    };

    const player2Turn = () => {
        player1.turn = false;
        player2.turn = true;
        p1HubName.style.textDecoration = 'none';
        p2HubName.style.textDecoration = 'underline';
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

    playAgain.onclick = () => {
        playAgain.style.display = 'none';
        p1HubName.style.textDecoration = 'underline';
        Gameboard.gameboard = [];
        Gameboard.renderMarks();
        markBoard();
        player1.turn = true;
        player2.turn = false;
        infoMessage.textContent = '';
        gameboard.style.pointerEvents = 'auto';
        takeTurns();
    }

    const endGame = () => {
        
        if (Gameboard.gameboard[0] == 'x' && Gameboard.gameboard[1] == 'x' && Gameboard.gameboard[2] == 'x' || 
            Gameboard.gameboard[3] == 'x' && Gameboard.gameboard[4] == 'x' && Gameboard.gameboard[5] == 'x' || 
            Gameboard.gameboard[6] == 'x' && Gameboard.gameboard[7] == 'x' && Gameboard.gameboard[8] == 'x' || 
            Gameboard.gameboard[0] == 'x' && Gameboard.gameboard[3] == 'x' && Gameboard.gameboard[6] == 'x' ||
            Gameboard.gameboard[1] == 'x' && Gameboard.gameboard[4] == 'x' && Gameboard.gameboard[7] == 'x' ||
            Gameboard.gameboard[2] == 'x' && Gameboard.gameboard[5] == 'x' && Gameboard.gameboard[8] == 'x' ||
            Gameboard.gameboard[0] == 'x' && Gameboard.gameboard[4] == 'x' && Gameboard.gameboard[8] == 'x' ||
            Gameboard.gameboard[2] == 'x' && Gameboard.gameboard[4] == 'x' && Gameboard.gameboard[6] == 'x') {

            infoMessage.textContent = `${player1.name} wins!`;
            player1.wins += 1;
            p1Wins.textContent = `Wins: ${player1.wins}`;
            playAgain.style.display = 'inline-block';
            gameboard.style.pointerEvents = 'none';

        } else if (Gameboard.gameboard[0] == 'o' && Gameboard.gameboard[1] == 'o' && Gameboard.gameboard[2] == 'o' || 
            Gameboard.gameboard[3] == 'o' && Gameboard.gameboard[4] == 'o' && Gameboard.gameboard[5] == 'o' || 
            Gameboard.gameboard[6] == 'o' && Gameboard.gameboard[7] == 'o' && Gameboard.gameboard[8] == 'o' || 
            Gameboard.gameboard[0] == 'o' && Gameboard.gameboard[3] == 'o' && Gameboard.gameboard[6] == 'o' ||
            Gameboard.gameboard[1] == 'o' && Gameboard.gameboard[4] == 'o' && Gameboard.gameboard[7] == 'o' ||
            Gameboard.gameboard[2] == 'o' && Gameboard.gameboard[5] == 'o' && Gameboard.gameboard[8] == 'o' ||
            Gameboard.gameboard[0] == 'o' && Gameboard.gameboard[4] == 'o' && Gameboard.gameboard[8] == 'o' ||
            Gameboard.gameboard[2] == 'o' && Gameboard.gameboard[4] == 'o' && Gameboard.gameboard[6] == 'o') {
            
            infoMessage.textContent = `${player2.name} wins!`;
            player2.wins += 1;
            p2Wins.textContent = `Wins: ${player2.wins}`
            playAgain.style.display = 'inline-block';
            gameboard.style.pointerEvents = 'none';

        } else if ((Gameboard.gameboard[0] == 'x' || Gameboard.gameboard[0] == 'o') &&
        (Gameboard.gameboard[1] == 'x' || Gameboard.gameboard[1] == 'o') &&
        (Gameboard.gameboard[2] == 'x' || Gameboard.gameboard[2] == 'o') &&
        (Gameboard.gameboard[3] == 'x' || Gameboard.gameboard[3] == 'o') &&
        (Gameboard.gameboard[4] == 'x' || Gameboard.gameboard[4] == 'o') &&
        (Gameboard.gameboard[5] == 'x' || Gameboard.gameboard[5] == 'o') &&
        (Gameboard.gameboard[6] == 'x' || Gameboard.gameboard[6] == 'o') &&
        (Gameboard.gameboard[7] == 'x' || Gameboard.gameboard[7] == 'o') &&
        (Gameboard.gameboard[8] == 'x' || Gameboard.gameboard[8] == 'o')) {

            infoMessage.textContent = 'Game tied.';
            playAgain.style.display = 'inline-block';
            gameboard.style.pointerEvents = 'none';
        }
    }

    return {takeTurns};
})();

game.takeTurns();

/* 
Bugs:
- Player can change the mark of a spot on the board to their own.
- Spots on gameboard remain changeable after a player has won.
*/