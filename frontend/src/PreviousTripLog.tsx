import { useContext } from "react";
import { Header } from "./Header";
import { TripCard } from "./TripCard";
import TripContext from "./tripContext/TripContext";
import "./PreviousTripLog.css";

interface PreviousTripLogProps {}
export function PreviousTripLog({}: PreviousTripLogProps) {
  const { trips, handleEdit } = useContext(TripContext);

  return (
    <div>
      <Header />
      <div className="past_trip_container">
        <h2>Your Past Trips</h2>
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
      </div>
    </div>
  );
}
