const createPlayer = (name, marker) => {
    return {
        name,
        marker
    }
}



const gameBoard = (() => {
    let board = [];
    for (let i = 0; i < 9; i++) {
        board.push('');
    }

    let boxes = document.querySelector('.boxes');

    board.forEach((item, index) => {
        const box = document.createElement('div');
        box.className = 'box';
        boxes.appendChild(box);
    });

    Array.from(boxes.children).forEach((box, index) => {
        box.addEventListener('click', () =>  {
            
            box.classList.add(gameRules.currentPlayer.marker);
            box.setAttribute('data', gameRules.currentPlayer.marker);

            board[index] = gameRules.currentPlayer.marker;

            box.style.pointerEvents = 'none';

            gameRules.remainingSpots -= 1;

            gameRules.checkWinner();
       
            if (gameRules.winnerDeclared == false) {
                if (gameRules.remainingSpots > 0) {
                    gameRules.alertNextPlayer();
                    gameRules.changePlayer();
                } else if (gameRules.remainingSpots == 0) {
                    gameRules.declareTie();
                }
            }

            if (gameRules.winnerDeclared == true) {
                boxes.style.pointerEvents = 'none';
            }

           

           

        })
    })




    return {
        board
    }
})();









const gameRules = (() => {
    const resetBtn = document.getElementById('reset-btn');
    let subtext = document.getElementById('subtext');
    let playerName = document.getElementById('player-name');
    
    const playerOne = createPlayer('Player 1', 'ex');
    const playerTwo = createPlayer('Player 2', 'oh');
    let winnerDeclared = false;
    let remainingSpots = 9;
    let currentPlayer = playerOne;

    

    winLines = [
        [0, 1, 2],
        [2, 5, 8],
        [6, 7, 8],
        [0, 3, 6],
        [3, 4, 5],
        [1, 4, 7],
        [0, 4, 8],
        [2, 4, 6],
      ];

      function changePlayer() {
          if (this.currentPlayer === playerOne) {
              this.currentPlayer = playerTwo
          } else {
              this.currentPlayer = playerOne
          }
      }

      function alertNextPlayer() {
         if (this.currentPlayer === playerOne) {
             playerName.innerHTML = 'Player 2s'
             playerName.style.color = '#F8485E';
         } else {
             playerName.innerHTML = 'Player 1s'
             playerName.style.color = '#39A6A3';
         }
      }


      function declareTie() {
          subtext.innerHTML = `No one wins! It's a tie!`
      }


      function checkWinner() {
          winLines.forEach((item, index) => {
              if (gameBoard.board[item[0]] === this.currentPlayer.marker && gameBoard.board[item[1]] === this.currentPlayer.marker && gameBoard.board[item[2]] === this.currentPlayer.marker) {
                  subtext.innerHTML = `<b>${this.currentPlayer.name} wins!</b>`
                  this.winnerDeclared = true;
              }

          })
      }

      resetBtn.addEventListener('click', () => {
          location.reload();
      });

    return {
        currentPlayer,
        winLines,
        changePlayer,
        winnerDeclared,
        remainingSpots,
        declareTie,
        alertNextPlayer,
        checkWinner
    }



})();