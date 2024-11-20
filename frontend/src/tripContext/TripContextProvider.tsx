import TripContext from "./TripContext";
import { getTrips, addTrip, deleteTrip, editTrip } from "../services/TripDbApi";
import { useState } from "react";
import Trip from "../models/trip";

interface Props {
  children: React.ReactNode;
}

export function TripContextProvider({ children }: Props) {
  const Icons = [
    { id: 1, src: "/01.png" },
    { id: 2, src: "/02.png" },
    { id: 3, src: "/03.png" },
    { id: 4, src: "/04.png" },
    { id: 5, src: "/05.png" },
    { id: 6, src: "/06.png" },
    { id: 7, src: "/07.png" },
    { id: 8, src: "/08.png" },
    { id: 11, src: "/11.png" },
    { id: 13, src: "/13.png" },
    { id: 14, src: "/14.png" },
    { id: 15, src: "/15.png" },
    { id: 16, src: "/16.png" },
    { id: 17, src: "/17.png" },
    { id: 18, src: "/18.png" },
    { id: 19, src: "/19.png" },
    { id: 20, src: "/20.png" },
    { id: 21, src: "/21.png" },
    { id: 22, src: "/22.png" },
    { id: 23, src: "/23.png" },
    { id: 24, src: "/24.png" },
    { id: 25, src: "/25.png" },
    { id: 26, src: "/26.png" },
    { id: 27, src: "/27.png" },
    { id: 28, src: "/28.png" },
    { id: 29, src: "/29.png" },
    { id: 30, src: "/30.png" },
    { id: 31, src: "/31.png" },
    { id: 32, src: "/32.png" },
    { id: 33, src: "/33.png" },
    { id: 34, src: "/34.png" },
    { id: 35, src: "/35.png" },
    { id: 36, src: "/36.png" },
    { id: 37, src: "/37.png" },
    { id: 38, src: "/38.png" },
    { id: 39, src: "/39.png" },
    { id: 40, src: "/40.png" },
    { id: 41, src: "/41.png" },
    { id: 42, src: "/42.png" },
    { id: 43, src: "/43.png" },
    { id: 44, src: "/44.png" },
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
