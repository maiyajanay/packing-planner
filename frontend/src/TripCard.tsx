import { Link } from "react-router-dom";
import Trip from "./models/trip";
import { Weather } from "./models/weather";
import { useNavigate } from "react-router-dom";
import "./TripCard.css";

interface TripCardProps {
  trip: Trip;
  weather: Weather | null;
  OnDelete: (id: string) => void;
  OnEdit: (trip: Trip, id: string) => void;
}

export function TripCard({ trip, weather, OnDelete, OnEdit }: TripCardProps) {
  const navigate = useNavigate();

  const tripSum =
    trip.shorts! +
    trip.pants! +
    trip.shirts! +
    trip.socks! +
    trip.underwear! +
    trip.sweatshirt! +
    trip.jacket!;
  
  return (
    <div className="trip_card">
      <h4>{trip.name}</h4>
      <p>{trip.to}</p>
      <p>Duration: {trip.duration} days</p>
      {trip.weather ? (
        <>
          <p>
            Min: {trip.weather.Temperature?.Minimum.Value}°
            {trip.weather.Temperature?.Minimum.Unit}
          </p>
          <p>
            Max: {trip.weather.Temperature?.Maximum.Value}°
            {trip.weather.Temperature?.Maximum.Unit}
          </p>
        </>
      ) : (
        <p>Loading weather...</p>
      )}
      {tripSum === 0 && (
        <button onClick={() => navigate(`packing/${trip._id}`)}>
          Start Packing
        </button>
      )}
      {tripSum > 0 && (
        <Link className="trip_card_button" to={`viewpacklist/${trip._id}`}>
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
