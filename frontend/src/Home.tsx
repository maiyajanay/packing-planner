import { useContext, useEffect, useState } from "react";
import Trip from "./models/trip";
import { Weather } from "./models/weather";
import { addTrip, getTrips } from "./services/TripDbApi";
import { PackingForm } from "./PackingForm";
import { Link } from "react-router-dom";
import TripContext from "./tripContext/TripContext";
import { fetchOneDayForecastByLocation } from "./services/WeatherApi";
import { SearchForm } from "./SearchForm";
import { TripList } from "./TripsList";
export function Home() {
  const { trips, fetchAndSetTrips } = useContext(TripContext);
  // const [trips, setTrips] = useState<Trip[]>([]);
  const [weather, setWeather] = useState<Weather | null>(null);

  // const fetchAndSetTrips = async () => {
  //   const trips = await getTrips();
  //   setTrips(trips);
  // };

  useEffect(() => {
    fetchAndSetTrips();
  }, []);

  const handleSearch = async (term: string, days: number) => {
    try {
      const weather = await fetchOneDayForecastByLocation(term);
      setWeather(weather[0]);
      await createAndAddTrip(term, days, weather[0]);
    } catch (error) {
      console.error("Failed to fetch weather or create trip:", error);
    }
  };

  const createAndAddTrip = async (destination: string, days: number, weather: Weather) => {
    const newTrip: Trip = {
      name: `Trip to ${destination}`,
      to: destination,
      duration: days,
      weather: weather,
      complete: false,
    };
    await addTrip(newTrip);
    fetchAndSetTrips();
  };

  return (
    <>
      <div>
        <SearchForm onSearch={handleSearch} />
        <TripList trips={trips} weather={weather} />
      </div>

    </>
  );
}
