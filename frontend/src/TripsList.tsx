import { useContext, useState } from "react";
import { TripCard } from "./TripCard";
import TripContext from "./tripContext/TripContext";
import "./TripsList.css"

export function TripList() {
  const { trips, handleDelete } = useContext(TripContext);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortCriteria, setSortCriteria] = useState<"location">("location");

  const handleSendDelete = (id: string) => {
    handleDelete(id);
  };

  const handleSortOrderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(event.target.value as "asc" | "desc");
  };

  const handleSortCriteriaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortCriteria(event.target.value as "location");
  };

  const sortedTrips = [...trips]
    .filter((trip) => !trip.complete)
    .sort((a, b) => {
      if (sortCriteria === "location") {
        const locationA = a.to.toLowerCase();
        const locationB = b.to.toLowerCase();
        if (locationA < locationB) return sortOrder === "asc" ? -1 : 1;
        if (locationA > locationB) return sortOrder === "asc" ? 1 : -1;
      }
      return 0;
    });

  return (
    <div className="trip_list_section">
      <div className="trip_list_container">
        <div className="trip_list_header">
          <h2>Your Upcoming Trips</h2>
          <div className="sort_controls">
            <select onChange={handleSortCriteriaChange} value={sortCriteria}>
              <option value="location">Sort by Location</option>
            </select>
            <select onChange={handleSortOrderChange} value={sortOrder}>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
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
