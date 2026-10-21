import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <>
      <aside className="side">
        <div className="side-brand">TripBanao</div>
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/plan">Create trip</NavLink>
        <NavLink to="/itinerary">Itinerary</NavLink>
      </aside>
    </>
  );
}
export default Sidebar;
