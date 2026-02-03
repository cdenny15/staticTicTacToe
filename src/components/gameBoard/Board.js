import React from "react";
import Square from "./Square";

export default function Board({isxNext, squares, onPlay}) {
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