import { useContext, useState } from "react";
import Trip from "./models/trip";
import { useNavigate, useParams } from "react-router-dom";
import "./PackingForm.css";
import TripContext from "./tripContext/TripContext";
import { Weather } from "./models/weather";
import { WeatherCard } from "./WeatherCard";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ViewPackingTitle } from "./ViewPackingTitle";
import { WeatherTile } from "./WeatherTile";

interface PackingFormProps {
  onEdit: (trip: Trip, id: string) => void;
}
export function PackingForm({ onEdit }: PackingFormProps) {
  const notify = () =>
    toast.success("Trip Saved!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const navigate = useNavigate();
  const { trips } = useContext(TripContext);
  const _id: string | undefined = useParams().id;
  const trip: Trip = trips.find((foundtrip) => foundtrip._id === _id)!;

  const [shorts, setShorts] = useState<number>(trip.shorts || 0);
  const [pants, setPants] = useState<number>(trip.pants || 0);
  const [shirts, setShirts] = useState<number>(trip.shirts || 0);
  const [socks, setSocks] = useState<number>(trip.socks || 0);
  const [underwear, setUnderwear] = useState<number>(trip.underwear || 0);
  const [sweatshirt, setSweatshirt] = useState<number>(trip.sweatshirt || 0);
  const [jacket, setJacket] = useState<number>(trip.jacket || 0);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onEdit(
      {
        name: trip.name,
        to: trip.to,
        duration: trip.duration,
        shorts: shorts,
        pants: pants,
        shirts: shirts,
        socks: socks,
        underwear: underwear,
        sweatshirt: sweatshirt,
        jacket: jacket,
        weather: trip.weather,
        complete: false,
        open: true,
      },
      trip._id?.toString() || ""
    );
    // navigate("/");
    // Maiya added the below navigation to stay on the packing page without having to navigate back to the home page
    navigate(`/viewpacklist/${trip?._id}`);
  }
  if (trip?._id === undefined) {
    return <p> no trip found</p>;
  } else {
    return (
      <div>
        <div className="viewPackingTitleContainer">
          <ViewPackingTitle trip={trip} />
        </div>        
        <div className="packingFormContainer">

          <div className="viewWeather">
            <h2 id="weatherTitle">Weather</h2>
            <div className="weatherReport">
              {Array.isArray(trip.weather) ? (
                trip.weather
                  ?.slice(0, trip.duration)
                  .map((forecast: Weather) => (
                    <WeatherTile key={forecast.Date} forecast={forecast} />
                  ))
              ) : (
                <WeatherTile key={0} forecast={trip.weather!} />
              )}
            </div>
          </div>

        <form className="packingForm" onSubmit={handleSubmit}>
          {trip.open ? (
            <h2 id="updateTitle">Update Packing List</h2>
          ) : (
            <h2 id="createTitle">Create Packing List</h2>
          )}

          {/* read only fields */}

          {/* <label>
            Name:
            <input type="text" value={trip.name} readOnly />
          </label>
          <label>
            To:
            <input type="text" value={trip.to} readOnly />
          </label>
          <label>
            Duration:
            <input type="number" value={trip.duration} readOnly />
          </label> */}

          <label>
            Shorts:
            <input
              type="number"
              value={shorts}
              onChange={(e) => setShorts(parseInt(e.target.value))}
            />
          </label>
          <label>
            Pants:
            <input
              type="number"
              value={pants || 0}
              onChange={(e) => setPants(parseInt(e.target.value))}
            />
          </label>
          <label>
            Shirts:
            <input
              type="number"
              value={shirts}
              onChange={(e) => setShirts(parseInt(e.target.value))}
            />
          </label>
          <label>
            Socks:
            <input
              type="number"
              value={socks}
              onChange={(e) => setSocks(parseInt(e.target.value))}
            />
          </label>
          <label>
            Underwear:
            <input
              type="number"
              value={underwear}
              onChange={(e) => setUnderwear(parseInt(e.target.value))}
            />
          </label>
          <label>
            Sweatshirt:
            <input
              type="number"
              value={sweatshirt}
              onChange={(e) => setSweatshirt(parseInt(e.target.value))}
            />
          </label>
          <label>
            Jacket:
            <input
              type="number"
              value={jacket}
              onChange={(e) => setJacket(parseInt(e.target.value))}
            />
          </label>
          <button className="packingButton" type="submit" onClick={notify}>
            Save Trip
          </button>
          <button className="packingButton" onClick={() => navigate("/")}>
            Cancel
          </button>
        </form>
      </div>
    </div>
    );
  }
}
