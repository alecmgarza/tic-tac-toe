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

const Player = (name, mark, turn) => {

    return {name, mark, turn};
};

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
        Gameboard.gameboard = '';
        Gameboard.renderMarks();
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
        const p1Name = document.getElementById('p1-name').value;
        return p1Name;
    };

    const player1 = Player(namePlayer1(), 'x', true);

    const namePlayer2 = () => {
        const p2Name = document.getElementById('p2-name').value;
        return p2Name;
    }

    const player2 = Player(namePlayer2(), 'o', false);

    const createPlayers = () => {
        submit.onclick = () => {
            modal.style.display = 'none';
            namePlayer1();
            namePlayer2();
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
            }
        }
    };

    return {markBoard, takeTurns, createPlayers};
})();

game.markBoard();
game.takeTurns();

/* 
Things to do:
Why doesn't onclick trigger player turn function? (boardSquare not being recognized)
How do I create a player and assign their name to an input value?
*/