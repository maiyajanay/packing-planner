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
      <div className="viewPacking">
          {/* <div className="viewWeather">
          <div>
            <h2 id="weatherTitle">Weather</h2>
          </div>
          <div className="weatherReport">
            {Array.isArray(trip.weather) ? (
              trip.weather
                ?.slice(0, trip.duration)
                .map((forecast: Weather) => (
                  <WeatherCard key={forecast.Date} forecast={forecast} />
                ))
            ) : (
              <WeatherCard key={0} forecast={trip.weather!} />
            )}
          </div>
        </div> */}

        <div className="viewWeather">
          <div>
            <h2 id="weatherTitle">Weather</h2>
          </div>
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
          {/* <h1 className="name">{trip?.name}</h1>
          <h2 className="to">{trip?.to}</h2> */}

          <div className="checklist">
            <h3>Packing List</h3>
            <div className="packingCheckbox">
              <label>Shorts: {trip?.shorts}</label>
              <input type="checkbox" readOnly checked={false} />
            </div>
            <div className="packingCheckbox">
              <label>Pants: {trip?.pants}</label>
              <input type="checkbox" readOnly checked={false} />
            </div>
            <div className="packingCheckbox">
              <label>Shirts: {trip?.shirts}</label>
              <input type="checkbox" readOnly checked={false} />
            </div>
            <div className="packingCheckbox">
              <label>Socks: {trip?.socks}</label>
              <input type="checkbox" readOnly checked={false} />
            </div>
            <div className="packingCheckbox">
              <label>Underwear: {trip?.underwear}</label>
              <input type="checkbox" readOnly checked={false} />
            </div>
            <div className="packingCheckbox">
              <label>Sweatshirt: {trip?.sweatshirt}</label>
              <input type="checkbox" readOnly checked={false} />
            </div>
            <div className="packingCheckbox">
              <label>Jacket: {trip?.jacket}</label>
              <input type="checkbox" readOnly checked={false} />
            </div>
          </div>
          {trip?.complete ? (
            <button onClick={() => navigate("/previoustrips")}> Back </button>
          ) : (
            <div className="viewButtons">
              <div /*className="editButton" <- temporarily removed the class from this spot*/> 
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
