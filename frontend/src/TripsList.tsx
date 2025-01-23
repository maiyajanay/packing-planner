import { useContext, useState } from "react";
import { TripCard } from "./TripCard";
import TripContext from "./tripContext/TripContext";
import "./TripsList.css"

export function TripList() {
  const { trips, handleDelete } = useContext(TripContext);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleSendDelete = (id: string) => {
    handleDelete(id);
  };

  const handleSortChange = (order: "asc" | "desc") => {
    setSortOrder(order);
  };

  const sortedTrips = [...trips]
  .filter((trip) => !trip.complete)
  .sort((a, b) => {
    const locationA = a.to.toLowerCase();
    const locationB = b.to.toLowerCase();
    if (locationA < locationB) return sortOrder === "asc" ? -1 : 1;
    if (locationA > locationB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <div className="trip_list_section">
      <div className="trip_list_container">
        <div className="trip_list_header">
          <h2>Your Upcoming Trips</h2>
          <div className="sort_buttons">
            <button onClick={() => handleSortChange("asc")}>Sort Ascending</button>
            <button onClick={() => handleSortChange("desc")}>Sort Descending</button>
          </div>
        </div>
        <div className="trip_card_container">
          {sortedTrips
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
