import { createContext } from "react";
import Trip from "../models/trip";
import { Icons } from "../models/icons";

interface TripContextProps {
  trips: Trip[];
  setTrips: (trips: Trip[]) => void;
  handleAdd: (trip: Trip) => void;
  handleDelete: (id: string) => void;
  handleEdit: (trip: Trip, id: string) => void;
  fetchAndSetTrips: () => void;
  Icons: Icons[];
}

const defaultTripContext: TripContextProps = {
  trips: [],
  setTrips: () => {},
  handleAdd: () => {},
  handleDelete: () => {},
  handleEdit: () => {},
  fetchAndSetTrips: () => {},
  Icons: [],
};

const TripContext = createContext<TripContextProps>(defaultTripContext);

export default TripContext;
