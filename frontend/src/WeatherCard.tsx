import { useContext } from "react";
import Trip from "./models/trip";
import { Weather } from "./models/weather";
import TripContext from "./tripContext/TripContext";
import "./WeatherCard.css";
interface WeatherCardProps {
  forecast: Weather;
}

export function WeatherCard({ forecast }: WeatherCardProps) {
  const { Icons } = useContext(TripContext);
  return (
    <div className="weatherInfo">
      <h3>{forecast.Date.substring(0, 10)}</h3>
      <p>
        Minimum Temp: {forecast.Temperature.Minimum.Value}°{" "}
        {forecast.Temperature.Minimum.Unit}
      </p>
      <p>
        Maximum Temp: {forecast.Temperature.Maximum.Value}°{" "}
        {forecast.Temperature.Maximum.Unit}
      </p>
      <div>
        <h3>Forecast During the Day</h3>
        {Icons.find((icon) => icon.id === forecast.Day.Icon) ? (
          <img className="dayIcon"
            src={Icons.find((icon) => icon.id === forecast.Day.Icon)?.src}
            alt="icon"
          />
        ) : (
          <p>No weather icon</p>
        )}
        <p>{forecast.Day.IconPhrase}</p>
        <p>
          Preciptation expected? :{" "}
          {forecast.Day.HasPrecipitation ? "Yes" : "No"}
        </p>
        <p>
          {forecast.Day?.PrecipitationIntensity}{" "}
          {forecast.Day?.PrecipitationType}
        </p>
        <h3>Forecast For the Night</h3>
        {Icons.find((icon) => icon.id === forecast.Night.Icon) ? (
          <img className="nightIcon"
            src={Icons.find((icon) => icon.id === forecast.Night.Icon)?.src}
            alt="icon"
          />
        ) : (
          <p>No weather icon</p>
        )}
        <p>{forecast.Night.IconPhrase}</p>
        <p>
          Preciptation expected? :
          {" "}{forecast.Night.HasPrecipitation ? "Yes" : "No"}
        </p>
        <p>
          {forecast.Night?.PrecipitationIntensity}{" "}
          {forecast.Night?.PrecipitationType}
        </p>
      </div>
    </div>
  );
}
