import axios from "axios";
import { Weather } from "../models/weather";

const API_KEY: string = import.meta.env.VITE_WEATHER_API_KEY || "";

const BASE_URL = "http://dataservice.accuweather.com/forecasts/v1/daily";

export function fetchOneDayForecastByLocation(query: string): Promise<Weather[]> {
    const url = `${BASE_URL}/1day/${query}?apikey=${API_KEY}`
    return axios
        .get<Weather[]>(url)
        .then(response => response.data);
}

export function fetchFiveDayForecastByLocation(query: string): Promise<Weather[]> {
    const url = `${BASE_URL}/5day/${query}?apikey=${API_KEY}`
    return axios
        .get<Weather[]>(url)
        .then(response => response.data);
}