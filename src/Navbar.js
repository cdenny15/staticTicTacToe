import { link } from 'react-router-dom';

export default function Navbar() {
    return (
      <nav className="navbar" >
        <ul className="nav-list">
          <li><a href="/">Home</a></li>
          <li><a href="/game">Game</a></li>
          <li><a href="/ranks">Ranks</a></li>
        </ul>
      </nav>

    );
}