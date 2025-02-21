import { useContext } from "react";
import TripContext from "../tripContext/TripContext";
import Trip from "../models/trip";

interface PackingFormItemProps {
  trip: Trip;
  onEdit: (trip: Trip, id: string) => void;
}

export function PackingFormItem({ trip, onEdit }: PackingFormItemProps) {
  const { fetchAndSetTrips, handleEdit } = useContext(TripContext);
  
    return (
    <div>
      <label>
        {trip.}
        <input
          type="number"
          value={shorts}
          onChange={(e) => setShorts(parseInt(e.target.value))}
        />
      </label>
    </div>
  );
}
