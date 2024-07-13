import { Link, useNavigate, useParams } from "react-router-dom";
import Trip from "./models/trip";
import { useContext } from "react";
import TripContext from "./tripContext/TripContext";
import "./ViewPacking.css";


export function ViewPacking() {
  const navigate = useNavigate();
  const { trips, fetchAndSetTrips, handleEdit, Icons} = useContext(TripContext);

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
    <>
      {trip.weather ? (
        <div className="weatherInfo">
          <h2>Weather</h2>
          {trip.weather.map((dayWeather, index) => (
            <div key={index}>
              <h3>Day {index + 1}</h3>
              <p>
                Min: {dayWeather.Temperature.Minimum.Value}°
                {dayWeather.Temperature.Minimum.Unit}
              </p>
              <p>
                Max: {dayWeather.Temperature.Maximum.Value}°
                {dayWeather.Temperature.Maximum.Unit}
              </p>
              <p>{dayWeather.Day.HasPrecipitation ? "Precipitation" : "No Precipitation"}</p>
              {dayWeather.Day.HasPrecipitation && (
                <>
                  <p>Type: {dayWeather.Day.PrecipitationType}</p>
                  <p>Intensity: {dayWeather.Day.PrecipitationIntensity}</p>
                </>
              )}
              <p>{dayWeather.Day.IconPhrase}</p>
              {Icons.map((icon) => {
                if (icon.id === dayWeather.Day.Icon) {
                  return <img key={icon.id} src={icon.icon} alt="icon" />;
                }
                return null;
              })}
            </div>
          ))}
        </div>
      ) : (
        <p>No Weather</p>
      )}


      <div className="viewList">
        <h1>{trip?.name}</h1>
        <h2>{trip?.to}</h2>

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
          <div>
            <Link to={`/packing/${trip?._id}`}>Edit Packing</Link>
            <button onClick={() => navigate("/")}>Back</button>
            <button onClick={handleComplete}>Trip Completed</button>
          </div>
        )}
      </div>
    </>
  );
}
