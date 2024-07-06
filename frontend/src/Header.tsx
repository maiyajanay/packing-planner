import { NavLink } from "react-router-dom";
import "./Header.css"

export function Header() {
  return (
    <>
      <h1>Packing Planner</h1>
      <ul>
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/previoustrips"}>Previous Trips</NavLink>
      </ul>
    </>
  );
}
