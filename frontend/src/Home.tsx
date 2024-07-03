import { useContext, useEffect, useState } from "react";
import Trip from "./models/trip";
import { Weather } from "./models/weather";
import { PackingForm } from "./PackingForm";
import { Link } from "react-router-dom";
import TripContext from "./tripContext/TripContext";
import { fetchOneDayForecastByLocation } from "./services/WeatherApi";
import { SearchForm } from "./SearchForm";
import { TripList } from "./TripsList";
export function Home() {
  const { trips, fetchAndSetTrips, handleAdd } = useContext(TripContext);
  const [weather, setWeather] = useState<Weather | null>(null);

  useEffect(() => {
    fetchAndSetTrips();
  }, []);

  async function handleSearch(term: string, days: number) {
    try {
      const weather = await fetchOneDayForecastByLocation(term);
      setWeather(weather[0]);
      await createAndAddTrip(term, days, weather[0]);
    } catch (error) {
      console.error("Failed to fetch weather or create trip:", error);
    }
  }

  const createAndAddTrip = async (
    destination: string,
    days: number,
    weather: Weather
  ) => {
    const newTrip: Trip = {
      name: `Trip to ${destination}`,
      to: destination,
      duration: days,
      weather: weather,
      complete: false,
      ...packingList,
    };
    await handleAdd(newTrip);
  };

  function calculatePackingList(duration: number, weather: Weather) {
    const isCold = weather.tempMax < 60; 
    return {
      shirts: duration,
      pants: duration / 2,
      shorts: isCold ? 0 : duration / 2,
      socks: duration,
      underwear: duration,
      sweatshirt: isCold ? duration / 2 : 0,
      jacket: isCold ? 1 : 0,
    };
  }

  return (
    <>
      <div>
        <SearchForm onSearch={handleSearch} />
        <TripList trips={trips} weather={weather} />
      </div>
    </>
  );
}
