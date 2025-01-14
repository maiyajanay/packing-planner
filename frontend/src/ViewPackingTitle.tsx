import { useContext } from "react";
import Trip from "./models/trip";
import { Weather } from "./models/weather";
import { format, parseISO } from 'date-fns';
import "./ViewPackingTitle.css";

interface ViewPackingTitleProps {
  trip: Trip;
//   forecast: Weather;
}

// export function ViewPackingTitle({ trip, forecast }: ViewPackingTitleProps) {
// export function ViewPackingTitle() {
export function ViewPackingTitle({ trip }: ViewPackingTitleProps) {

    
    //NEED TO FIGURE OUT HOW TO ADD DATES - CAN REFERENCE OTHER COMPONENTS
    // const getFormattedDateParts = (dateString: any) => {
    //     const dayOfWeek = format(parseISO(dateString), 'EEEE');
    //     const monthAndDay = format(parseISO(dateString), 'MMMM d');
    //     return { dayOfWeek, monthAndDay };
    // };

    // const { dayOfWeek, monthAndDay } = getFormattedDateParts(forecast.Date.substring(0, 10));

    return (
        <div className="viewPackingTitle">
            <h2 className="trip-name">{trip.name}</h2>
            <h3>Trip To {trip.to}</h3>
            <p>Duration: {trip.duration} days</p>
        </div>
    );
}
