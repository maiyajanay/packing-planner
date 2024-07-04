import { useContext, useEffect, useState } from "react";
import Trip from "./models/trip";
import { Weather } from "./models/weather";
import { Link } from "react-router-dom";
import TripContext from "./tripContext/TripContext";
import { fetchOneDayForecastByLocation, fetchFiveDayForecastByLocation } from "./services/WeatherApi";
import { SearchForm } from "./SearchForm";
import { TripList } from "./TripsList";

export function Home() {
  const { trips, fetchAndSetTrips, handleAdd } = useContext(TripContext);
  const [weather, setWeather] = useState<Weather | null>(null);

  useEffect(() => {
    fetchAndSetTrips();
  }, []);

  async function handleSearch(locationKey: string, locationName: string, days: number) {
    try {
      const weatherData = days <= 4 
        ? await fetchOneDayForecastByLocation(locationKey)
        : await fetchFiveDayForecastByLocation(locationKey);
      
      const selectedWeather = Array.isArray(weatherData) ? weatherData[0] : weatherData;

      setWeather(selectedWeather);

      await createAndAddTrip(locationName, days, selectedWeather);
    } catch (error) {
      console.error("Failed to fetch weather or create trip:", error);
    }
  }

  const createAndAddTrip = async (
    destination: string,
    days: number,
    weather: Weather
  ) => {
    const packingList = calculatePackingList(days, weather);
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
      pants: Math.ceil(duration / 2),
      shorts: isCold ? 0 : Math.ceil(duration / 2),
      socks: duration,
      underwear: duration,
      sweatshirt: isCold ? Math.ceil(duration / 2) : 0,
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