import { useContext } from "react";
import { Weather } from "./models/weather";
import TripContext from "./tripContext/TripContext";
import { format, parseISO } from 'date-fns';
import "./WeatherCard.css";
interface WeatherCardProps {
  forecast: Weather;
}

export function WeatherCard({ forecast }: WeatherCardProps) {
  const { Icons } = useContext(TripContext);
  const getFormattedDateParts = (dateString: any) => {
    const dayOfWeek = format(parseISO(dateString), 'EEEE');
    const monthAndDay = format(parseISO(dateString), 'MMMM d');
    return { dayOfWeek, monthAndDay };
  };

  const { dayOfWeek, monthAndDay } = getFormattedDateParts(forecast.Date.substring(0, 10));

  return (
    <div className="weatherInfo">
      {/* <h3>{forecast.Date.substring(0, 10)}</h3> Old formatting, changed 1/7 */}
      <h3>{dayOfWeek}</h3> {/* Day of the week */}
      <p style={{ fontFamily: '"DM Serif Display", serif', fontWeight: 'bold' }}>{monthAndDay}</p> {/* Month and Day in bold */}
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
          <img
            className="dayIcon"
            src={Icons.find((icon) => icon.id === forecast.Day.Icon)?.src}
            alt="icon"
          />
        ) : (
          <p>No weather icon</p>
        )}
        <p>{forecast.Day.IconPhrase}</p>
        <p>
          Preciptation expected? :{" "}
          {forecast.Day.HasPrecipitation ? (
            <p>
              {forecast.Day?.PrecipitationIntensity}{" "}
              {forecast.Day?.PrecipitationType}
            </p>
          ) : (
            "No"
          )}
        </p>

        <h3>Forecast For the Night</h3>
        {Icons.find((icon) => icon.id === forecast.Night.Icon) ? (
          <img
            className="nightIcon"
            src={Icons.find((icon) => icon.id === forecast.Night.Icon)?.src}
            alt="icon"
          />
        ) : (
          <p>No weather icon</p>
        )}
        <p>{forecast.Night.IconPhrase}</p>
        <p>
          Preciptation expected? :{" "}
          {forecast.Night.HasPrecipitation ? (
            <p>
              {forecast.Night?.PrecipitationIntensity}{" "}
              {forecast.Night?.PrecipitationType}
            </p>
          ) : (
            "No"
          )}
        </p>
      </div>
    </div>
  );
}
