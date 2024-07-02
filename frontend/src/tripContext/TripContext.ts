import { createContext } from "react";
import Trip from "../models/trip";

interface TripContextProps {
  trips: Trip[];
  setTrips: (trips: Trip[]) => void;
  handleAdd: (trip: Trip) => void;
  handleDelete: (trip: Trip) => void;
  handleEdit: (trip: Trip) => void;
  fetchAndSetTrips: () => void;
}

const defaultTripContext: TripContextProps = {
  trips: [],
  setTrips: () => {},
  handleAdd: () => {},
  handleDelete: () => {},
  handleEdit: () => {},
  fetchAndSetTrips: () => {},
};

const TripContext = createContext<TripContextProps>(defaultTripContext);

export default TripContext;