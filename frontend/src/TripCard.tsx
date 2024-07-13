import { Link } from "react-router-dom";
import Trip from "./models/trip";
import { Weather } from "./models/weather";
import { useNavigate } from "react-router-dom";
import "./TripCard.css";

interface TripCardProps {
  trip: Trip;
  OnDelete: (id: string) => void;
  OnEdit: (trip: Trip, id: string) => void;
}

export function TripCard({ trip, OnDelete, OnEdit }: TripCardProps) {
  let firstDayWeather: Weather | null = null;

  if (trip.weather) {
    if (Array.isArray(trip.weather)) {
      firstDayWeather = trip.weather[0];
    } else {
      firstDayWeather = trip.weather;
    }
  }

  return (
    <div className="trip_card">
      <h4>{trip.name}</h4>
      <p>{trip.to}</p>
      <p>Duration: {trip.duration} days</p>
      {firstDayWeather ? (
        <>
          <p>
            Min: {firstDayWeather.Temperature.Minimum.Value}°
            {firstDayWeather.Temperature.Minimum.Unit}
          </p>
          <p>
            Max: {firstDayWeather.Temperature.Maximum.Value}°
            {firstDayWeather.Temperature.Maximum.Unit}
          </p>
        </>
      ) : (
        <p></p>
      )}
      {trip.open === false && (
        <Link className="trip_card_button" to={`packing/${trip._id}`}>
          Start Packing
        </Link>
      )}
      {trip.open === true && (
        <Link className="trip_card_button" to={`viewpacklist/${trip?._id}`}>
          View Packing List
        </Link>
      )}
      {trip.complete ? (
        <button
          className="trip_card_button"
          onClick={() =>
            OnEdit(
              {
                ...trip,
                complete: false,
              },
              trip._id?.toString()!
            )
          }
        >
          Restore
        </button>
      ) : (
        <button
          className="trip_card_button"
          onClick={() => OnDelete(trip._id?.toString()!)}
        >
          Remove
        </button>
      )}
    </div>
  );
}
