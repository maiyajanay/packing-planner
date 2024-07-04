import { Link } from "react-router-dom";
import Trip from "./models/trip";
import { Weather } from "./models/weather";
import { useNavigate } from "react-router-dom";
interface TripCardProps {
  trip: Trip;
  weather: Weather | null;
}

export function TripCard({ trip, weather }: TripCardProps) {
    const navigate = useNavigate();
    return (
    <div>
        <p>{trip.name}</p>
        <p>{trip.to}</p>
        {weather ? (
        <>
            <p>Min: {weather.tempMin}°{weather.temperatureUnit}</p>
            <p>Max: {weather.tempMax}°{weather.temperatureUnit}</p>
        </>
        ) : (
        <p>Loading weather...</p>
        )}
        <button onClick={() => navigate(`packing/${trip._id}`)}>
        Start Packing{" "}
        </button>
        <button>End Trip</button>
    </div>
    );
}
