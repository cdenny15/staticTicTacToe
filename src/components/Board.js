import React from "react";
import Square from "./Square";
import Header from "./Header";

export default function Board({squares}) {
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
    // render the board with status and rows -->  <div className="status">{status}</div>
    return (
        <div>
        {boardRows}
        </div>
      );
    }

    