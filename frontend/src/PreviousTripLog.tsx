import { useContext } from "react";
import { Header } from "./Header";
import { TripCard } from "./TripCard";
import TripContext from "./tripContext/TripContext";
import Trip from "./models/trip";
import { Weather } from "./models/weather";
interface PreviousTripLogProps {
  weather: Weather | null;
}
export function PreviousTripLog({ weather }: PreviousTripLogProps) {
  const { trips, handleEdit } = useContext(TripContext);
  function handleSendEdit(trip: Trip, id: string) {
    handleEdit(trip, id);
  }

  return (
    <>
      <Header />
      <div>
        {trips
          .filter((trip) => trip.complete)
          .map((trip) => (
            <TripCard
              key={trip._id?.toString()}
              trip={trip}
              weather={weather}
              OnDelete={() => {}}
              OnEdit={handleSendEdit}
            />
          ))}
      </div>
    </>
  );
}
