import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="home-page">
      <h1>Welcome to Tic Tac Toe</h1>
      <p className="home-tagline">Let's play tic tac toe with a twist!</p>

      <section className="how-to-play" aria-labelledby="how-to-play-heading">
        <h2 id="how-to-play-heading">How to Play</h2>
        <ol className="how-to-play-list">
          <li>
            <strong>Objective:</strong> Get three of your marks in a row—horizontally, vertically, or diagonally.
          </li>
          <li>
            <strong>Turns:</strong> Players take turns. One plays <strong>X</strong>, the other <strong>O</strong>.
          </li>
          <li>
            <strong>Place a mark:</strong> Click an empty square to place your mark. You cannot change a square once it's filled.
          </li>
          <li>
            <strong>Win:</strong> The first player to get three in a row wins the game.
          </li>
          <li>
            <strong>Draw:</strong> If all nine squares are filled and no one has three in a row, the game is a draw.
          </li>
        </ol>
      </section>

      <Link to="/game" className="play-button">
        Play
      </Link>
    </div>
  );
}