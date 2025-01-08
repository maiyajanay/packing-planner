import { useContext } from "react";
import { TripCard } from "./TripCard";
import TripContext from "./tripContext/TripContext";
import "./TripsList.css"

export function TripList() {
  const { trips, handleDelete } = useContext(TripContext);

  const handleSendDelete = (id: string) => {
    handleDelete(id);
  };

  return (
    <div className="trip_list_section">
      <div className="trip_list_container">
        <div className="trip_list_header">
          <h2>Your Upcoming Trips</h2>
        </div>
        <div className="trip_card_container">
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
    </div>
  );
}
