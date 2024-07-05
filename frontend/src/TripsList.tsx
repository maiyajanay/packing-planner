import { useContext } from "react";
import Trip from "./models/trip";
import { Weather } from "./models/weather";
import { TripCard } from "./TripCard";
import TripContext from "./tripContext/TripContext";

interface TripListProps {
  weather: Weather | null;
}

export function TripList({ weather }: TripListProps) {
  const { trips, handleDelete } = useContext(TripContext);

  const handleSendDelete = (id: string) => {
    handleDelete(id);
  };

  return (
    <div>
      <h2>Your Upcoming Trips</h2>
      <div>
        {trips
          .filter((trip) => !trip.complete)
          .map((trip) => (
            <TripCard
              key={trip._id?.toString()}
              trip={trip}
              weather={weather}
              OnDelete={handleSendDelete}
              OnEdit={() => {}}
            />
          ))}
      </div>
    </div>
  );
}
