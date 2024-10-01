import axios from "axios";
import { Weather } from "../models/weather";

const baseUrl: string = import.meta.env.VITE_API_URL || "";
console.log("Base URL being used:", baseUrl);

interface AutocompleteResult {
  Version: number;
  Key: string;
  Type: string;
  Rank: number;
  LocalizedName: string;
  Country: {
    ID: string;
    LocalizedName: string;
  };
  AdministrativeArea: {
    ID: string;
    LocalizedName: string;
  };
}

export const getAutocompleteSuggestions = async (
  query: string
): Promise<AutocompleteResult[]> => {
  return (await axios.get(`${baseUrl}/autocomplete?q=${query}`)).data;
};

export const fetchOneDayForecastByLocation = async (
  locationKey: string
): Promise<Weather> => {
  return (await axios.get(`${baseUrl}/forecast/1day/${locationKey}`)).data;
};

export const fetchFiveDayForecastByLocation = async (
  locationKey: string
): Promise<Weather[]> => {
  return (await axios.get(`${baseUrl}/forecast/5day/${locationKey}`)).data;
};
