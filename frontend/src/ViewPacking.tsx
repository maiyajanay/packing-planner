import { Link, useNavigate, useParams } from "react-router-dom";
import Trip from "./models/trip";
import { useContext } from "react";
import TripContext from "./tripContext/TripContext";
import "./ViewPacking.css";
import { WeatherCard } from "./WeatherCard";
import { WeatherTile } from "./WeatherTile";
import { ViewPackingTitle } from "./ViewPackingTitle";
import { Weather } from "./models/weather";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function ViewPacking() {
  const navigate = useNavigate();
  const { trips, fetchAndSetTrips, handleEdit } = useContext(TripContext);
  const complete = () =>
    toast.success("Trip Completed!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
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
    complete();
    navigate("/");
  }

  return (
    <div>
      <div className="viewPackingTitleContainer">
        <ViewPackingTitle trip={trip}/>
      </div>
      <div className="packingListContainer">

        <div className="viewWeather">
          <h2 id="weatherTitle">Weather</h2>
          <div className="weatherReport">
            {Array.isArray(trip.weather) ? (
              trip.weather
                ?.slice(0, trip.duration)
                .map((forecast: Weather) => (
                  <WeatherTile key={forecast.Date} forecast={forecast} />
                ))
            ) : (
              <WeatherTile key={0} forecast={trip.weather!} />
            )}
          </div>
        </div>

        <div className="viewList">
          <div className="checklist">
            <h2>Packing List</h2>
            <div className="packingCheckbox">
              <input type="checkbox" readOnly checked={false} />
              <label>Shorts: {trip?.shorts}</label>
            </div>
            <div className="packingCheckbox">
            <input type="checkbox" readOnly checked={false} />
              <label>Pants: {trip?.pants}</label>
            </div>
            <div className="packingCheckbox">
              <input type="checkbox" readOnly checked={false} />
              <label>Shirts: {trip?.shirts}</label>
            </div>
            <div className="packingCheckbox">
              <input type="checkbox" readOnly checked={false} />  
              <label>Socks: {trip?.socks}</label>              
            </div>
            <div className="packingCheckbox">
              <input type="checkbox" readOnly checked={false} />
              <label>Underwear: {trip?.underwear}</label>              
            </div> 
            <div className="packingCheckbox">
              <input type="checkbox" readOnly checked={false} />
              <label>Sweatshirt: {trip?.sweatshirt}</label>              
            </div>
            <div className="packingCheckbox">
              <input type="checkbox" readOnly checked={false} />
              <label>Jacket: {trip?.jacket}</label>              
            </div>
          </div>
          {trip?.complete ? (
            <button onClick={() => navigate("/previoustrips")}> Back </button>
          ) : (
            <div className="viewButtons">
              <div> 
                <Link className="editButton" to={`/packing/${trip?._id}`}>Edit Packing</Link>
              </div>
              <div className="actionButtons">
                <button id="back" onClick={() => navigate("/")}>
                  Back
                </button>
                <button id="complete" onClick={handleComplete}>
                  Trip Completed
                </button>
              </div>
            </div>
          )}
        </div>
      
      </div>
    </div>
  );
}
