import { useContext } from "react";
import { Header } from "./Header";
import { TripCard } from "./TripCard";
import TripContext from "./tripContext/TripContext";
import Trip from "./models/trip";

interface PreviousTripLogProps {}
export function PreviousTripLog({}: PreviousTripLogProps) {
  const { trips, handleEdit } = useContext(TripContext);
  // function handleSendEdit(trip: Trip, id: string) {
  //   handleEdit(trip, id);
  // }

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
              OnDelete={() => {}}
              OnEdit={(trip) => handleEdit(trip, trip._id?.toString()!)}
            />
          ))}
      </div>
    </>
  );
}
