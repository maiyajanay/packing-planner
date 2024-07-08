import { useContext, useState } from "react";
import Trip from "./models/trip";
import { useNavigate, useParams } from "react-router-dom";
import "./PackingForm.css";
import TripContext from "./tripContext/TripContext";
interface PackingFormProps {
  onEdit: (trip: Trip, id: string) => void;
}
export function PackingForm({ onEdit }: PackingFormProps) {
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
        // weather: trip.weather,
        complete: false,
      },
      trip._id?.toString() || ""
    );
    navigate("/");
  }
  if (trip?._id === undefined) {
    return <p> no trip found</p>;
  } else {
    return (
      <>
        <div>
          {trip.weather ? (
            <div className="weatherInfo">
              <h2>Weather</h2>
              <p>
                Min: {trip.weather.Temperature?.Minimum.Value}
                {trip.weather.Temperature?.Minimum.Unit}
              </p>
              <p>
                Max: {trip.weather.Temperature?.Maximum.Value}
                {trip.weather.Temperature?.Maximum.Unit}
              </p>
            </div>
          ) : (
            <p>No Weather</p>
          )}
        </div>

        <form className="packingForm" onSubmit={handleSubmit}>
          <h1> Create Your Packing List</h1>
          <label>
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
          </label>

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
          <button type="submit">Save Trip</button>
          <button onClick={() => navigate("/")}>Cancel</button>
        </form>
      </>
    );
  }
}
