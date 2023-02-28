const Gameboard = (() => {
    let gameboard = [];

    function renderMarks() {
        for (i = 0; i < gameboard.length; i++) {
            const boardSquare = document.getElementById(i);
            boardSquare.textContent = Gameboard.gameboard[i];
        }
    }

    return {gameboard, renderMarks};
})();



const game = (() => {

    const startButton = document.getElementById('start');
    const restartButton = document.getElementById('restart');
    const modal = document.getElementById('modal');
    const gameboard = document.getElementById('gameboard');
    const boardSquares = document.getElementsByClassName('board-squares');
    const submit = document.getElementById('submit');

    startButton.onclick = () => {
        startButton.style.display = 'none';
        restartButton.style.display = 'block';
        modal.style.display = 'block';    
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
    };

    

    const player2Turn = () => {
        player1.turn = false;
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
            }
        }
    };

    return {markBoard, takeTurns};
})();



const Player = (name, mark, turn) => {

    return {name, mark, turn};
};

const player1 = Player('Player 1', 'x', true);
const player2 = Player('Player 2', 'o', false);

game.markBoard();
game.takeTurns();

/* 
Things to do:
Why doesn't onclick trigger player turn function? (boardSquare not being recognized)
How do I create a player and assign their name to an input value?
*/