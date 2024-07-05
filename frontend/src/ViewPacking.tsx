import { Link, useNavigate, useParams } from "react-router-dom";
import Trip from "./models/trip";
import { useContext } from "react";
import TripContext from "./tripContext/TripContext";
import "./ViewPacking.css";
export function ViewPacking() {
  const navigate = useNavigate();
  const { trips, fetchAndSetTrips, handleEdit } = useContext(TripContext);

  const _id: string | undefined = useParams().id;
  const trip: Trip = trips.find((foundtrip: Trip) => foundtrip._id === _id)!;

  function handleComplete() {
    handleEdit(
      {
        ...trip,
        complete: true,
      },
      trip?._id?.toString() || ""
    );
    fetchAndSetTrips();
    navigate("/");
  }

  return (
    <div className="viewList">
      <h1>{trip?.name}</h1>
      <h2>{trip?.to}</h2>
      <h3>{trip?._id?.toString()}</h3>
      <div className="checklist">
        <label>Shorts: {trip?.shorts}</label>
        <input type="checkbox" readOnly checked={false} />
        <label>Pants: {trip?.pants}</label>
        <input type="checkbox" readOnly checked={false} />
        <label>Shirts: {trip?.shirts}</label>
        <input type="checkbox" readOnly checked={false} />
        <label>Socks: {trip?.socks}</label>
        <input type="checkbox" readOnly checked={false} />
        <label>Underwear: {trip?.underwear}</label>
        <input type="checkbox" readOnly checked={false} />
        <label>Sweatshirt: {trip?.sweatshirt}</label>
        <input type="checkbox" readOnly checked={false} />
        <label>Jacket: {trip?.jacket}</label>
        <input type="checkbox" readOnly checked={false} />
      </div>
      <Link to={`/packing/${trip._id}`}>Edit Packing</Link>

      <button onClick={() => navigate("/")}>Back</button>
      <button onClick={handleComplete}>Trip Completed</button>
    </div>
  );
}
