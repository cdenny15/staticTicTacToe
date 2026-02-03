import React from "react";
import { useState } from "react";
import Board from "./Board";

export default function MoveHistory() {
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

    return (
        <div> 
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