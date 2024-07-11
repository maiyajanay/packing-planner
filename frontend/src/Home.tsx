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
  const [weather, setWeather] = useState<Weather | null>(null);

  useEffect(() => {
    fetchAndSetTrips();
  }, []);

  async function handleSearch(
    tripName: string,
    locationKey: string,
    locationName: string,
    days: number
  ) {
    try {
      const weatherData =
        days <= 4
          ? await fetchOneDayForecastByLocation(locationKey)
          : await fetchFiveDayForecastByLocation(locationKey);

      const selectedWeather = Array.isArray(weatherData)
        ? weatherData[0]
        : weatherData;

      setWeather(selectedWeather);

      await createAndAddTrip(tripName, locationName, days, selectedWeather);
    } catch (error) {
      console.error("Failed to fetch weather or create trip:", error);
    }
  }

  const createAndAddTrip = async (
    tripName: string,
    destination: string,
    days: number,
    weather: Weather
  ) => {
    const packingList = calculatePackingList(days, weather);
    const newTrip: Trip = {
      name: tripName || `Trip to ${destination}`,
      to: destination,
      duration: days,
      weather: weather,
      complete: false,
      ...packingList,
    };
    console.log("New trip:", newTrip); 
    await handleAdd(newTrip);
  };

  function calculatePackingList(duration: number, weather: Weather) {
    const isCold = weather.Temperature.Maximum.Value < 60;
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
        <TripList weather={weather} />
      </div>
    </>
  );
}


//////////////

// export function Home() {
//   const { trips, fetchAndSetTrips, handleAdd, handleDelete } =
//     useContext(TripContext);
//   const [weather, setWeather] = useState<Weather | null>(null);

//   useEffect(() => {
//     fetchAndSetTrips();
//   }, []);

//   async function handleSearch(
//     tripName: string,
//     destination: string,
//     days: number
//   ) {
//     try {
//       await createAndAddTrip(tripName, destination, days);
//     } catch (error) {
//       console.error("Failed to create trip:", error);
//     }
//   }

//   const createAndAddTrip = async (
//     tripName: string,
//     destination: string,
//     days: number,
//   ) => {
//     const newTrip: Trip = {
//       name: tripName || `Trip to ${destination}`,
//       to: destination,
//       duration: days,
//       complete: false,
//     };
//     console.log("New trip:", newTrip); 
//     await handleAdd(newTrip);
//   };

//   return (
//     <>
//       <Header />
//       <div>
//         <SearchForm onSearch={handleSearch} />
//         <TripList weather={weather} />
//       </div>
//     </>
//   );
// }
