import { Link } from "react-router-dom";
import Trip from "./models/trip";
import { Weather } from "./models/weather";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import TripContext from "./tripContext/TripContext";
import "./TripCard.css"

interface TripCardProps {
  trip: Trip;
  weather: Weather | null;
  OnDelete: (id: string) => void;
  OnEdit: (trip: Trip, id: string) => void;
}

export function TripCard({ trip, weather, OnDelete, OnEdit }: TripCardProps) {
  const navigate = useNavigate();
  // const { handleEdit } = useContext(TripContext);
  // const handleClick = () => {
  //   handleEdit(
  //     {
  //       ...trip,
  //       complete: false,
  //     },
  //     trip._id?.toString()!
  //   );
  // };
  return (
    <div className="trip_card">
        <h4>{trip.name}</h4>
        <p>{trip.to}</p>
        {weather ? (
        <>
            <p>Min: {weather.tempMin}°{weather.temperatureUnit}</p>
            <p>Max: {weather.tempMax}°{weather.temperatureUnit}</p>
        </>
        ) : (
        <p>Loading weather...</p>
      )}
      {trip.underwear === 0 && (
        <button onClick={() => navigate(`packing/${trip._id}`)}>
          Start Packing
        </button>
      )}
      {trip.underwear !== 0 && (
        <Link className='trip_card_button' to={`viewpacklist/${trip._id}`}>View Packing List</Link>
      )}
      {trip.complete ? (
        <button
          className='trip_card_button'
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
        <button className='trip_card_button' onClick={() => OnDelete(trip._id?.toString()!)}> Remove</button>
      )}
    </div>
    );
}
