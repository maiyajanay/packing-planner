import { useContext, useEffect, useState } from "react";
import Trip from "./models/trip";
import { Weather } from "./models/weather";
import { Header } from "./Header";
import TripContext from "./tripContext/TripContext";
import {
  fetchOneDayForecastByLocation,
  fetchFiveDayForecastByLocation,
} from "./services/WeatherApi";
import { SearchForm } from "./SearchForm";
import { TripList } from "./TripsList";

export function Home() {
  const { trips, fetchAndSetTrips, handleAdd, handleDelete } =
    useContext(TripContext);
  const [weather, setWeather] = useState<Weather[] | null>(null);

  useEffect(() => {
    fetchAndSetTrips();
  }, []);

  async function handleSearch(
    tripName: string,
    locationKey: string,
    locationName: string,
    days: number
  ) {
    console.log("Days parameter in handleSearch:", days);
    try {
      const weatherData =
        days === 1
          ? [await fetchOneDayForecastByLocation(locationKey)]
          : await fetchFiveDayForecastByLocation(locationKey);

      console.log("Fetched weather data:", weatherData); // Log weather data
      setWeather(weatherData);
      await createAndAddTrip(tripName, locationName, days, weatherData);
    } catch (error) {
      console.error("Failed to fetch weather or create trip:", error);
    }
  }

  const createAndAddTrip = async (
    tripName: string,
    destination: string,
    days: number,
    weather: Weather[]
  ) => {
    console.log("Weather data in createAndAddTrip:", weather);
    console.log("Days parameter in createAndAddTrip:", days); // Log days value
    const packingList = calculatePackingList(days, weather[0]);
    const newTrip: Trip = {
      name: tripName || `Trip to ${destination}`,
      to: destination,
      duration: days,
      weather: weather,
      complete: false,
      open: false,
      ...packingList,
    };
    console.log("New trip duration:", days);
    console.log("New trip:", newTrip); // Log new trip object
    handleAdd(newTrip);
  };

  function calculatePackingList(duration: number, weather: Weather) {
    const isCold = weather.Temperature.Minimum.Value < 60;
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
      <Header />
      <div>
        <SearchForm onSearch={handleSearch} />
        <TripList />
      </div>
    </>
  );
}
