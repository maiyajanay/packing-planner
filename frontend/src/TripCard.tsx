import { useContext } from "react";
import TripContext from "./tripContext/TripContext";
import { Link } from "react-router-dom";
import Trip from "./models/trip";
import "./TripCard.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { format, parseISO } from 'date-fns';
interface TripCardProps {
  trip: Trip;
  OnDelete: (id: string) => void;
  OnEdit: (trip: Trip, id: string) => void;
}

export function TripCard({ trip, OnDelete, OnEdit }: TripCardProps) {
  const { fetchAndSetTrips, handleEdit } = useContext(TripContext);
  function addOrdinalSuffix(dayOfMonth: number): string {
    const j = dayOfMonth % 10,
          k = dayOfMonth % 100;
    if (j === 1 && k !== 11) {
      return dayOfMonth + "st";
    }
    if (j === 2 && k !== 12) {
      return dayOfMonth + "nd";
    }
    if (j === 3 && k !== 13) {
      return dayOfMonth + "rd";
    }
    return dayOfMonth + "th";
  }
  
  // Format date to include day of the week, month, and day with ordinal suffix
  const formatDate = (dateString: string): string => {
    const date = parseISO(dateString);
    const dayOfWeek = format(date, 'EEEE'); // Day of the week
    const month = format(date, 'MMMM'); // Month
    const dayOfMonth = format(date, 'd'); // Day of the month as a number
    const dayWithSuffix = addOrdinalSuffix(parseInt(dayOfMonth, 10));
  
    return `${dayOfWeek}, ${month} ${dayWithSuffix}`;
  };

  const extractYear = (dateString: string): string => {
    const date = parseISO(dateString);
    return format(date, 'yyyy');
  };

  const handleRestore = () => {
    OnEdit(
      {
        ...trip,
        complete: false,
      },
      trip._id?.toString()!
    );
    notify2();
  };
  
  const handleRemove = () => {
    OnDelete(trip._id?.toString()!);
    notify1();
  };

  const handleComplete = () => {
    handleEdit(
      {
          ...trip,
          complete: true,
      },
      trip?._id?.toString() || ""
      );
    fetchAndSetTrips();
    notify3();
  };

  const notify1 = () =>
    toast.success("Trip Deleted!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const notify2 = () =>
    toast.success("Trip Restored!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    const notify3 = () =>
      toast.success("Trip Completed!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

    return (
    <div className="trip_card">
      <h4>{trip.name}</h4>
      <p>{trip.to}</p>
      <p>Duration: {trip.duration} days</p>
      {Array.isArray(trip.weather) ? (
        <div>
          <div>

            {/* Original date code below
            <p>
              Date(s): {trip.weather[0]?.Date?.substring(0, 10)}
              {trip.duration > 1 && (
                <span>
                  {" "}
                  to {trip.weather[trip.duration - 1]?.Date?.substring(0, 10)}
                </span>
              )}
            </p> */}

            {/* New date code below */}
            <p>
              Date(s): {formatDate(trip.weather[0]?.Date.substring(0, 10))}
              {trip.duration > 1 && trip.weather[trip.duration - 1] ? (
                <span>
                  {" to "}{formatDate(trip.weather[trip.duration - 1].Date.substring(0, 10))}
                </span>
              ) : null}
              {`, ${extractYear(trip.weather[0].Date)}`}
            </p>  
          </div>
          <p>
            Max Temp During Trip:{" "}
            {Math.max(...trip.weather.map((o) => o.Temperature?.Maximum.Value))}
            °{trip.weather[0].Temperature?.Maximum.Unit}
          </p>
          <p>
            Minimum Temp During Trip:{" "}
            {Math.min(...trip.weather.map((o) => o.Temperature?.Minimum.Value))}
            °{trip.weather[0].Temperature?.Minimum.Unit}
          </p>
        </div>
      ) : (
        <div>
          {/* Date(s): <p>{trip.weather?.Date?.substring(0, 10)}</p>  Original Date Format 
          <p>
            Max Temp During Trip: {trip.weather!.Temperature?.Maximum.Value}°
            {trip.weather!.Temperature?.Maximum.Unit}
          </p>
          <p>
            Min Temp During Trip: {trip.weather!.Temperature?.Minimum.Value}°
            {trip.weather!.Temperature?.Minimum.Unit}
          </p> */}

          Date(s): <p>{trip.weather && formatDate(trip.weather?.Date.substring(0, 10))}</p>
          {/* Fallback content if no weather data */}
          <p>No weather data available</p>
        </div>
      )}
      {/* // If trip is open, display "View Packing List" button, else display "Start Packing" button */}
      <Link
        className="trip_card_button"
        to={trip.open ? `viewpacklist/${trip._id}` : `packing/${trip._id}`}
      >
        {trip.open ? "View Packing List" : "Start Packing"}
      </Link>
      <button
        className="trip_card_button"
        onClick={trip.complete ? handleRestore : handleRemove}
        >
        {trip.complete ? "Restore" : "Remove"}
      </button>
      {!trip.complete && (
        <button
          className="trip_card_button"
          onClick={handleComplete}
        >
          Trip Completed
        </button>
      )}
    </div>
  );
}
