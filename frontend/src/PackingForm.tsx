import { useState } from "react";
import Trip from "./models/trip";
import { useNavigate, useParams } from "react-router-dom";

interface PackingFormProps {
  trips: Trip[];
  // tripDate: string;
  onEdit: (trip: Trip) => void;
}
export function PackingForm({ onEdit, trips }: PackingFormProps) {
  const navigate = useNavigate();

  const _id: string | undefined = useParams().id;
  const trip: Trip | undefined =
    trips.find((foundtrip) => foundtrip._id === _id) || undefined;

  const [dates, setDates] = useState("");
  const [shorts, setShorts] = useState<number>(0);
  const [pants, setPants] = useState<number>(0);
  const [shirts, setShirts] = useState<number>(0);
  const [socks, setSocks] = useState<number>(0);
  const [underwear, setUnderwear] = useState<number>(0);
  const [sweatshirt, setSweatshirt] = useState<number>(0);
  const [jacket, setJacket] = useState<number>(0);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onEdit({
      name: trip.name,
      to: trip.to,
      dates: trip.dates?.toString() || dates,
      shorts: trip.shorts || shorts,
      pants: trip.pants || pants,
      shirts: trip.shirts || shirts,
      socks: trip.socks || socks,
      underwear: trip.underwear || underwear,
      sweatshirt: trip.sweatshirt || sweatshirt,
      jacket: trip.jacket || jacket,

      complete: false,
    });
    navigate("/");

    setDates("");
    setShorts(0);
    setPants(0);
    setShirts(0);
    setSocks(0);
    setUnderwear(0);
    setSweatshirt(0);
    setJacket(0);
  }
  if (trip === undefined) {
    return <p> no trip found</p>;
  } else {
    return (
      <>
        <form onSubmit={handleSubmit}>
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
            Dates:
            <input
              type="text"
              value={trip.dates || dates}
              onChange={(e) => setDates(e.target.value)}
            />
          </label>
          <label>
            Shorts:
            <input
              type="number"
              value={trip.shorts || shorts}
              onChange={(e) => setShorts(parseInt(e.target.value))}
            />
          </label>
          <label>
            Pants:
            <input
              type="number"
              value={trip.pants || pants}
              onChange={(e) => setPants(parseInt(e.target.value))}
            />
          </label>
          <label>
            Shirts:
            <input
              type="number"
              value={trip.shirts || shirts}
              onChange={(e) => setShirts(parseInt(e.target.value))}
            />
          </label>
          <label>
            Socks:
            <input
              type="number"
              value={trip.socks || socks}
              onChange={(e) => setSocks(parseInt(e.target.value))}
            />
          </label>
          <label>
            Underwear:
            <input
              type="number"
              value={trip.underwear || underwear}
              onChange={(e) => setUnderwear(parseInt(e.target.value))}
            />
          </label>
          <label>
            Sweatshirt:
            <input
              type="number"
              value={trip.sweatshirt || sweatshirt}
              onChange={(e) => setSweatshirt(parseInt(e.target.value))}
            />
          </label>
          <label>
            Jacket:
            <input
              type="number"
              value={trip.jacket || jacket}
              onChange={(e) => setJacket(parseInt(e.target.value))}
            />
          </label>
          <button type="submit">Save Trip</button>
        </form>
      </>
    );
  }
}
