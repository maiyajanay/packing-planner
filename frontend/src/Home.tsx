import { useEffect, useState } from "react";
import Trip from "./models/trip";
import { addTrip, getTrips } from "./services/TripDbApi";

export function Home() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const fetchAndSetTrips = async () => {
    const trips = await getTrips();
    setTrips(trips);
  };

  useEffect(() => {
    fetchAndSetTrips();
  }, []);
  // const handleAdd = async (trip: Trip) => {
  //   await addTrip(trip);
  //   fetchAndSetTrips();
  // };
  return (
    <>
      <ul>
        {trips.map((trip) => (
          <li key={trip._id?.toString()}>
            ID: {trip._id?.toString()}
            <div> Name:{trip.name}</div>
            <div> complete: {trip.complete ? "Yes" : "No"}</div>
          </li>
        ))}
      </ul>
    </>
  );
}
