import React from 'react';

export default function Square({value, onSquareClick, highlight}) {
    return (
      <button 
      className={`square ${highlight ? 'highlight' : ''}`}
        onClick={onSquareClick}> 
          {value}
      </button>
    );
  }