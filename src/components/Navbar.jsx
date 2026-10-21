import {Link, NavLink} from 'react-router-dom'


function Navbar() {
  return (
    <>
      <header className="nav">
        <Link to="/" className="nav-brand">
          TripBanao
        </Link>
        <nav className="nav-links">
          <NavLink to="/plan">Plan trip</NavLink>
          <NavLink to="/itinerary">Itinerary</NavLink>
        </nav>
      </header>
    </>
  );
}
export default Navbar;
