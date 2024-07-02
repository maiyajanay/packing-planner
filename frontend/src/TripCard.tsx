import Trip from "./models/trip";
import { Weather } from "./models/weather";
import { TripCard } from "./TripCard";

interface TripListProps {
  trips: Trip[];
  weather: Weather | null;
}

export function TripList({ trips, weather }: TripListProps) {
    return (
        <div>
            <h2>Your Upcoming Trips</h2>
            <div>
                {trips.map((trip) => (
                <TripCard key={trip._id?.toString()} trip={trip} weather={weather} />
                ))}
            </div>
        </div>
    );
}