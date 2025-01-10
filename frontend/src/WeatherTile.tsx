import { useContext } from "react";
import { Weather } from "./models/weather";
import TripContext from "./tripContext/TripContext";
import { format, parseISO } from 'date-fns';
import "./WeatherTile.css";

interface WeatherTileProps {
  forecast: Weather;
}

export function WeatherTile({ forecast }: WeatherTileProps) {
  const { Icons } = useContext(TripContext);
  
  const getFormattedDateParts = (dateString: any) => {
    const dayOfWeek = format(parseISO(dateString), 'EEEE');
    const shortDayOfWeek = format(parseISO(dateString), 'EEE');
    const monthAndDay = format(parseISO(dateString), 'MMMM d');
    return { shortDayOfWeek, dayOfWeek, monthAndDay };
  };

  const { shortDayOfWeek, dayOfWeek, monthAndDay } = getFormattedDateParts(forecast.Date.substring(0, 10));

  return (
    <div className="weatherTile">     
        <p style={{ fontFamily: '"DM Serif Display", serif', fontWeight: 'bold' }}>{shortDayOfWeek}</p>
        <div className="weatherIcon">
            {Icons.find((icon) => icon.id === forecast.Day.Icon) ? (
            <img
                className="dayIcon"
                src={Icons.find((icon) => icon.id === forecast.Day.Icon)?.src}
                alt="icon"
            />
            ) : (
            <p>No weather icon</p>
            )}
        </div>
        <div className="weatherTemps">
            <p className="tempMax">{forecast.Temperature.Maximum.Value}°</p>
            <p className="tempMin">{forecast.Temperature.Minimum.Value}°</p>
        </div>
    </div>
  );
}
