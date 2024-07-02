import { Link } from "react-router-dom";
import Trip from "./models/trip";
import { Weather } from "./models/weather";

interface TripCardProps {
    trip: Trip;
    weather: Weather | null;
}

export function TripCard({ trip, weather }: TripCardProps) {
    return (
        <div>
        <p>{trip.name}</p>
        <p>{trip.to}</p>
        {weather ? (
            <>
            <p>Min: {weather.tempMin}</p>
            <p>Max: {weather.tempMax}</p>
            </>
        ) : (
            <p>Loading weather...</p>
        )}
        <Link to={`trips/${trip._id}`}>Start Packing</Link>
        <button>End Trip</button>
        </div>
    );
}
