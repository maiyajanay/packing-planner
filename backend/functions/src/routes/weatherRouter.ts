import express from "express";
import axios from "axios";
import { Weather } from "../models/weather";
import * as functions from "firebase-functions";

const API_KEY: string = functions.config().accuweatherapitoken;
const BASE_URL = "http://dataservice.accuweather.com";
const weatherRouter = express.Router();

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

interface ForecastResult {
  DailyForecasts: Weather[];
}

weatherRouter.get("/autocomplete", async (req, res) => {
  const query = req.query.q as string;
  const url = `${BASE_URL}/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${query}`;

  try {
    const response = await axios.get<AutocompleteResult[]>(url);
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching autocomplete suggestions:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

weatherRouter.get("/forecast/1day/:locationKey", async (req, res) => {
  const locationKey = req.params.locationKey;
  const url = `${BASE_URL}/forecasts/v1/daily/1day/${locationKey}?apikey=${API_KEY}`;

  try {
    const response = await axios.get<ForecastResult>(url);
    res.status(200).json(response.data.DailyForecasts[0]);
  } catch (error) {
    console.error("Error fetching one-day forecast:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

weatherRouter.get("/forecast/5day/:locationKey", async (req, res) => {
  const locationKey = req.params.locationKey;
  const url = `${BASE_URL}/forecasts/v1/daily/5day/${locationKey}?apikey=${API_KEY}`;

  try {
    const response = await axios.get<ForecastResult>(url);
    res.status(200).json(response.data.DailyForecasts);
  } catch (error) {
    console.error("Error fetching five-day forecast:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default weatherRouter;
