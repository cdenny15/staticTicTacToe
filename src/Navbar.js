import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/game">Game</Link></li>
        <li><Link to="/ranks">Ranks</Link></li>
      </ul>
    </nav>
  );
}