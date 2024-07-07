import { NavLink } from "react-router-dom";
import "./Header.css"

export function Header() {
  return (
    <>
      <h1>Packing Planner</h1>
      <ul>
        <NavLink className='header_button' to={"/"}>Home</NavLink>
        <NavLink className='header_button' to={"/previoustrips"}>Previous Trips</NavLink>
      </ul>
    </>
  );
}
