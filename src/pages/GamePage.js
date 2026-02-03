import MoveHistory from "../components/gameBoard/moveHistory";



// Main game component
export default function GamePage () {
   
    
    // render the game component and showing the board and move history
    return (
      <>
      <Header />
      <div>
        <MoveHistory />
      </div>
      </>
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
  
  
  