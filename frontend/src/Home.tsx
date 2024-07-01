import { useContext, useEffect, useState } from "react";
import Trip from "./models/trip";
import { addTrip, getTrips } from "./services/TripDbApi";
import { PackingForm } from "./PackingForm";
import { Link } from "react-router-dom";
import TripContext from "./tripContext/TripContext";

export function Home() {
  const { trips, fetchAndSetTrips } = useContext(TripContext);
  useEffect(() => {
    fetchAndSetTrips();
  }, []);

  return (
    <>
      <ul>
        {trips.map((trip) => (
          <li key={trip._id?.toString()}>
            ID: {trip._id?.toString()}
            <div> Name:{trip.name}</div>
            <div> complete: {trip.complete ? "Yes" : "No"}</div>
            <Link to={`/details/${trip._id}`}> Start Packing </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
