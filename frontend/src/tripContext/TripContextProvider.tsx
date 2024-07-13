import TripContext from "./TripContext";
import { getTrips, addTrip, deleteTrip, editTrip } from "../services/TripDbApi";
import { useState } from "react";
import Trip from "../models/trip";
interface Props {
  children: React.ReactNode;
}

export function TripContextProvider({ children }: Props) {
  const [trips, setTrips] = useState<Trip[]>([]);
  const fetchAndSetTrips = async () => {
    const trips = await getTrips();
    setTrips(trips);
  };

  const handleAdd = async (trip: Trip) => {
    await addTrip(trip);
  };

  const handleDelete = async (id: string) => {
    await deleteTrip(id);
  };

  const handleEdit = async (trip: Trip, id: string) => {
    await editTrip(trip, id);
  };

  return (
    <TripContext.Provider
      value={{
        trips,
        setTrips,
        handleAdd,
        handleDelete,
        handleEdit,
        fetchAndSetTrips,
      }}
    >
      {children}
    </TripContext.Provider>
  );
}
