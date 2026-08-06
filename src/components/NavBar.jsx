import { NavLink } from 'react-router-dom';

// Shared navigation bar rendered on every page. Uses NavLink instead of
// Link specifically because NavLink knows which route is currently
// active and lets us style it differently (highlighting where you are).
function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Weather Dashboard</div>
      <div className="navbar-links">
        <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
          Home
        </NavLink>
        <NavLink to="/cities" className={({ isActive }) => (isActive ? 'active' : '')}>
          Cities
        </NavLink>
        <NavLink to="/favorites" className={({ isActive }) => (isActive ? 'active' : '')}>
          Favorites
        </NavLink>
      </div>
    </nav>
  );
}

export default NavBar;