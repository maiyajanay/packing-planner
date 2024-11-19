import { useContext } from "react";
import { TripCard } from "./TripCard";
import TripContext from "./tripContext/TripContext";

export function TripList() {
  const { trips, handleDelete } = useContext(TripContext);

  const handleSendDelete = (id: string) => {
    handleDelete(id);
  };

  return (
    <div>
      <h2>Your Upcoming Trips</h2>
      <h2>Checking this is working</h2>
      <div>
        {trips
          .filter((trip) => !trip.complete)
          .map((trip) => (
            <TripCard
              key={trip._id?.toString()}
              trip={trip}
              OnDelete={handleSendDelete}
              OnEdit={() => {}}
            />
          ))}
      </div>
    </div>
  );
}
