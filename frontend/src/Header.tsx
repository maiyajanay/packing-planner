import { NavLink } from "react-router-dom";
import "./Header.css"

export function Header() {
  return (
    <header className="header_container">
      <h1>Packing Planner</h1>
      <div className="header_button_container">
        <NavLink className='header_button' to={"/"}>Home</NavLink>
        <NavLink className='header_button' to={"/previoustrips"}>Previous Trips</NavLink>
      </div>
    </header>
  );
}
