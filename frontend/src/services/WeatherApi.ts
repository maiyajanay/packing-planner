import axios from "axios";
import { Weather } from "../models/weather";

const API_KEY: string = import.meta.env.VITE_ACCUWEATHER_API_KEY || "";
const BASE_URL = "http://dataservice.accuweather.com";

interface AutocompleteResult {
    Key: string;
    LocalizedName: string;
}

interface ForecastResult {
    DailyForecasts: Weather[];
}

export function getAutocompleteSuggestions(query: string): Promise<AutocompleteResult[]> {
    const url = `${BASE_URL}/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${query}`;
    return axios
        .get<AutocompleteResult[]>(url)
        .then(response => response.data)
        .catch(error => {
            console.error("Error fetching autocomplete suggestions:", error);
            throw error;
        });
}

export function fetchOneDayForecastByLocation(locationKey: string): Promise<Weather> {
    const url = `${BASE_URL}/forecasts/v1/daily/1day/${locationKey}?apikey=${API_KEY}`;
    return axios
        .get<ForecastResult>(url)
        .then(response => response.data.DailyForecasts[0])
        .catch(error => {
            console.error("Error fetching one-day forecast:", error);
            throw error;
        });
}

export function fetchFiveDayForecastByLocation(locationKey: string): Promise<Weather[]> {
    const url = `${BASE_URL}/forecasts/v1/daily/5day/${locationKey}?apikey=${API_KEY}`;
    return axios
        .get<ForecastResult>(url)
        .then(response => response.data.DailyForecasts)
        .catch(error => {
            console.error("Error fetching five-day forecast:", error);
            throw error;
        });
}
