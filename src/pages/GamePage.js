import { useState } from "react";



// Main game component
export default function GamePage () {
    const [history, setHistory] = useState([Array(9).fill(null)]); //set the history state
    const [currentMove, setCurrentMove] = useState(0); //set the current move state
    const isxNext = currentMove % 2 === 0; //determine if X is next
    const currentSquares = history[currentMove]; //get the current squared from the history
  
  
    // function to handle when a player makes a move
    function handlePlay(nextSquares) {
      const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]; //set next history to update the history to include the new move
      setHistory(nextHistory); // update the history state
      setCurrentMove(nextHistory.length -1); // update the current move state
    }
  
    // function to jump to a specific move in the history
    function jumpTo(nextMove) {
      const trimmedHistory = history.slice(0, nextMove + 1); // trim the history to the selected move
      setCurrentMove(nextMove);
      setHistory(trimmedHistory); // update the history state
    } 
  
    const moves = history.map((squares, move) => { // map over the history to create a list of moves
      let description;
      let returnTo;
      if (move > 0) {
        description = 'You are at move #' + move;
        returnTo = ' Go to move #' + move;
      } else {
        description = 'You are at game start ';
        returnTo = ' Restart game';
      }
    return (
      <div key={move}>
        <li>
        {description}
        <button onClick={() => jumpTo(move)}>{returnTo}</button>
        </li>
      </div>
    );
    });
    
    // render the game component and showing the board and move history
    return (
      <div> 
        <Header />
      <div className="game">
        <div className="game-board">
          <Board
            isxNext={isxNext}
            squares={currentSquares}
            onPlay={handlePlay}
          />
        </div>
        <div className="game-info">
          <ol>{moves}</ol>
        </div>
      </div>
      </div>
    );
  }
  
  // Header Component
  function Header() {
    return (
      <header>
        <h1>Tic Tac Toe</h1>
      </header>
    );
  }
  
  
  // Square Component - child component of Board
  function Square({value, onSquareClick, highlight}) {
    return (
      <button 
      className={`square ${highlight ? 'highlight' : ''}`}
        onClick={onSquareClick}> 
          {value}
      </button>
    );
  }
  
  // Board Component
  function Board({isxNext, squares, onPlay}) {
    // this function handles the click event on a square
    function handleClick(i) {
      console.log('click ' , i);
      // if the square is already filled or there is a winner, do nothing
      if (squares[i] || calculateWinner(squares)) {
        return;
      }
      const nextSquares = squares.slice();
      if (isxNext) {
        nextSquares[i] = 'X';
      } else {
        nextSquares[i] = 'O';
      }
    onPlay(nextSquares);
    }
    //calculate the winner and status of the game
    const result = calculateWinner(squares);
    const winner = result ? result.winner : null;
    const winningSquares = result ? result.line : [];
    let status;
    if (winner) {
      status = 'Winner: ' + winner + ' lines: ' + winningSquares.join(', ');
    } else if (squares.every(Boolean)) {
      status = "It's a draw!";
    } else {
      status = 'Next player: ' + (isxNext ? 'X' : 'O');
    }
  
    // create the board rows and squares dynamically instead of hardcoding them
    const boardRows = [];
    for (let row = 0; row < 3; row++) {
      const rowSquares = [];
      for (let col = 0; col < 3; col++) {
        const index = row * 3 + col;
        rowSquares.push(
          <Square key={index} value={squares[index]} onSquareClick={() => handleClick(index)} highlight={winningSquares ? winningSquares.includes(index) : null} />
        )
      }
      // push the row of squares into the boardRows array
      boardRows.push(
        <div key={row} className="board-row">
          {rowSquares}
        </div>
      );
      }
    // render the board with status and rows
    return (
      <>
        <div className="status">{status}</div>
          {boardRows}
      </>
      );
    }
  
  // calculate the winner of the game
  function calculateWinner(squares) {
      const lines = [ // defining all possible winning combinations
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
      // cheeck each winning combination and return the winner if found
      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          return {winner : squares[a], line: [a, b, c]};
        }
      }
      return null;
  }
  
  