// TripContextProvider.tsx
import TripContext from "./TripContext";
import { getTrips, addTrip, deleteTrip, editTrip } from "../services/TripDbApi";
import { useState } from "react";
import Trip from "../models/trip";

interface Props {
  children: React.ReactNode;
}

export function TripContextProvider({ children }: Props) {
  const Icons = [
    { id: 1, src: "./assets/01-s.png" },
    { id: 2, src: "./assets/02-s.png" },
    { id: 3, src: "./assets/03-s.png" },
    { id: 4, src: "./assets/04-s.png" },
    { id: 5, src: "./assets/05-s.png" },
    { id: 6, src: "./assets/06-s.png" },
    { id: 7, src: "./assets/07-s.png" },
    { id: 8, src: "./assets/08-s.png" },
    { id: 11, src: "./assets/11-s.png" },
    { id: 13, src: "./assets/13-s.png" },
    { id: 14, src: "./assets/14-s.png" },
    { id: 15, src: "./assets/15-s.png" },
    { id: 16, src: "./assets/16-s.png" },
    { id: 17, src: "./assets/17-s.png" },
    { id: 18, src: "./assets/18-s.png" },
    { id: 19, src: "./assets/19-s.png" },
    { id: 20, src: "./assets/20-s.png" },
    { id: 21, src: "./assets/21-s.png" },
    { id: 22, src: "./assets/22-s.png" },
    { id: 23, src: "./assets/23-s.png" },
    { id: 24, src: "./assets/24-s.png" },
    { id: 25, src: "./assets/25-s.png" },
    { id: 26, src: "./assets/26-s.png" },
    { id: 27, src: "./assets/27-s.png" },
    { id: 28, src: "./assets/28-s.png" },
    { id: 29, src: "./assets/29-s.png" },
    { id: 30, src: "./assets/30-s.png" },
    { id: 31, src: "./assets/31-s.png" },
    { id: 32, src: "./assets/32-s.png" },
    { id: 33, src: "./assets/33-s.png" },
    { id: 34, src: "./assets/34-s.png" },
    { id: 35, src: "./assets/35-s.png" },
    { id: 36, src: "./assets/36-s.png" },
    { id: 37, src: "./assets/37-s.png" },
    { id: 38, src: "./assets/38-s.png" },
    { id: 39, src: "./assets/39-s.png" },
    { id: 40, src: "./assets/40-s.png" },
    { id: 41, src: "./assets/41-s.png" },
    { id: 42, src: "./assets/42-s.png" },
    { id: 43, src: "./assets/43-s.png" },
    { id: 44, src: "./assets/44-s.png" },
  ];

  const [trips, setTrips] = useState<Trip[]>([]);
  const fetchAndSetTrips = async () => {
    const trips = await getTrips();
    setTrips(trips);
  };

  const handleAdd = async (trip: Trip) => {
    await addTrip(trip);
    fetchAndSetTrips();
  };

  const handleDelete = async (id: string) => {
    await deleteTrip(id);
    fetchAndSetTrips();
  };

  const handleEdit = async (trip: Trip, id: string) => {
    await editTrip(trip, id);
    fetchAndSetTrips();
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
        Icons,
      }}
    >
      {children}
    </TripContext.Provider>
  );
}
