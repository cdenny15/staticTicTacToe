import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <img src="/logo.svg" alt="" className="navbar-logo" />
        <span className="navbar-title">Tic Tac Toe</span>
      </Link>
      <ul className="nav-list">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/game">Game</Link></li>
        <li><Link to="/ranks">Ranks</Link></li>
      </ul>
    </nav>
  );
}