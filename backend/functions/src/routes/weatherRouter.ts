import express from "express";
import axios from "axios";
import { Weather } from "../models/weather";
import * as functions from "firebase-functions";

const API_KEY: string = functions.config().accuweatherapitoken;
const BASE_URL = "http://dataservice.accuweather.com";
const weatherRouter = express.Router();

interface AutocompleteResult {
    Version: number,
    Key: string,
    Type: string,
    Rank: number,
    LocalizedName: string,
    Country: {
        ID: string,
        LocalizedName: string
    },
    AdministrativeArea: {
        ID: string,
        LocalizedName: string
    }
}

interface ForecastResult {
    DailyForecasts: Weather[];
}

const autocompleteResult: AutocompleteResult = {
    Version: 1,
    Key: "329376",
    Type: "City",
    Rank: 55,
    LocalizedName: "Kalamazoo",
    Country: {
        ID: "US",
        LocalizedName: "United States"
    },
    AdministrativeArea: {
        ID: "MI",
        LocalizedName: "Michigan"
    }
}

const oneDayForecastKalamazoo: Weather = {      
    Temperature: { 
        Minimum: {
            Value: 60,
            Unit: "F",
            },
        Maximum: {
            Value: 75,
            Unit: "F",
            },
        Day: {
            Icon: 18,
            IconPhrase: "Rain",
            HasPrecipitation: true,
            PrecipitationType: "Rain",
            PrecipitationIntensity: "Heavy"
            },
        Night: {
            Icon: 7,
            IconPhrase: "Cloudy",
            HasPrecipitation: true,
            PrecipitationType: "Rain",
            PrecipitationIntensity: "Light"
            }
    }
}

const fiveDayForecastKalamazoo: Weather[] = [
        {
            Date: "2024-07-10T07:00:00-04:00",
            EpochDate: 1720609200,
            Temperature: {
                Minimum: {
                    Value: 60,
                    Unit: "F",
                    UnitType: 18
                },
                Maximum: {
                    Value: 75,
                    Unit: "F",
                    UnitType: 18
                }
            },
            Day: {
                Icon: 18,
                IconPhrase: "Rain",
                HasPrecipitation: true,
                PrecipitationType: "Rain",
                PrecipitationIntensity: "Heavy"
            },
            Night: {
                Icon: 7,
                IconPhrase: "Cloudy",
                HasPrecipitation: true,
                PrecipitationType: "Rain",
                PrecipitationIntensity: "Light"
            },
            Sources: [
                "AccuWeather"
            ],
            MobileLink: "http://www.accuweather.com/en/us/kalamazoo-mi/49007/daily-weather-forecast/329376?day=1&lang=en-us",
            Link: "http://www.accuweather.com/en/us/kalamazoo-mi/49007/daily-weather-forecast/329376?day=1&lang=en-us"
        },
        {
            Date: "2024-07-11T07:00:00-04:00",
            EpochDate: 1720695600,
            Temperature: {
                Minimum: {
                    Value: 64,
                    Unit: "F",
                    UnitType: 18
                },
                Maximum: {
                    Value: 82,
                    Unit: "F",
                    UnitType: 18
                }
            },
            Day: {
                Icon: 14,
                IconPhrase: "Partly sunny w/ showers",
                HasPrecipitation: true,
                PrecipitationType: "Rain",
                PrecipitationIntensity: "Light"
            },
            Night: {
                Icon: 34,
                IconPhrase: "Mostly clear",
                HasPrecipitation: false
            },
            Sources: [
                "AccuWeather"
            ],
            MobileLink: "http://www.accuweather.com/en/us/kalamazoo-mi/49007/daily-weather-forecast/329376?day=2&lang=en-us",
            Link: "http://www.accuweather.com/en/us/kalamazoo-mi/49007/daily-weather-forecast/329376?day=2&lang=en-us"
        },
        {
            Date: "2024-07-12T07:00:00-04:00",
            EpochDate: 1720782000,
            Temperature: {
                Minimum: {
                    Value: 64,
                    Unit: "F",
                    UnitType: 18
                },
                Maximum: {
                    Value: 81,
                    Unit: "F",
                    UnitType: 18
                }
            },
            Day: {
                Icon: 17,
                IconPhrase: "Partly sunny w/ t-storms",
                HasPrecipitation: true,
                "PrecipitationType": "Rain",
                "PrecipitationIntensity": "Moderate"
            },
            "Night": {
                "Icon": 34,
                "IconPhrase": "Mostly clear",
                "HasPrecipitation": false
            },
            "Sources": [
                "AccuWeather"
            ],
            "MobileLink": "http://www.accuweather.com/en/us/kalamazoo-mi/49007/daily-weather-forecast/329376?day=3&lang=en-us",
            "Link": "http://www.accuweather.com/en/us/kalamazoo-mi/49007/daily-weather-forecast/329376?day=3&lang=en-us"
        },
        {
            "Date": "2024-07-13T07:00:00-04:00",
            "EpochDate": 1720868400,
            "Temperature": {
                "Minimum": {
                    "Value": 68,
                    "Unit": "F",
                    "UnitType": 18
                },
                "Maximum": {
                    "Value": 87,
                    "Unit": "F",
                    "UnitType": 18
                }
            },
            "Day": {
                "Icon": 2,
                "IconPhrase": "Mostly sunny",
                "HasPrecipitation": false
            },
            "Night": {
                "Icon": 12,
                "IconPhrase": "Showers",
                "HasPrecipitation": true,
                "PrecipitationType": "Rain",
                "PrecipitationIntensity": "Light"
            },
            "Sources": [
                "AccuWeather"
            ],
            "MobileLink": "http://www.accuweather.com/en/us/kalamazoo-mi/49007/daily-weather-forecast/329376?day=4&lang=en-us",
            "Link": "http://www.accuweather.com/en/us/kalamazoo-mi/49007/daily-weather-forecast/329376?day=4&lang=en-us"
        },
        {
            "Date": "2024-07-14T07:00:00-04:00",
            "EpochDate": 1720954800,
            "Temperature": {
                "Minimum": {
                    "Value": 70,
                    "Unit": "F",
                    "UnitType": 18
                },
                "Maximum": {
                    "Value": 89,
                    "Unit": "F",
                    "UnitType": 18
                }
            },
            "Day": {
                "Icon": 6,
                "IconPhrase": "Mostly cloudy",
                "HasPrecipitation": true,
                "PrecipitationType": "Rain",
                "PrecipitationIntensity": "Moderate"
            },
            "Night": {
                "Icon": 41,
                "IconPhrase": "Partly cloudy w/ t-storms",
                "HasPrecipitation": true,
                "PrecipitationType": "Rain",
                "PrecipitationIntensity": "Moderate"
            },
            "Sources": [
                "AccuWeather"
            ],
            "MobileLink": "http://www.accuweather.com/en/us/kalamazoo-mi/49007/daily-weather-forecast/329376?day=5&lang=en-us",
            "Link": "http://www.accuweather.com/en/us/kalamazoo-mi/49007/daily-weather-forecast/329376?day=5&lang=en-us"
        }
]


const errorResponse = (error: any, res: any) => {
    console.error("FAIL", error);
    res.status(500).json({ message: "Internal Server Error" });
};

weatherRouter.get("/autocomplete", async (req, res) => {
    try {
        res.status(200).json(autocompleteResult);
    } catch (err) {
    errorResponse(err, res);
    }
});

weatherRouter.get("/forecast/1day/:locationKey", async (req, res) => {
    const locationKey = "329376";
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

// weatherRouter.get("/autocomplete", async (req, res) => {
//     const query = req.query.q as string;
//     const url = `${BASE_URL}/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${query}`;
    
//     try {
//         const response = await axios.get<AutocompleteResult[]>(url);
//         res.status(200).json(response.data);
//     } catch (error) {
//         console.error("Error fetching autocomplete suggestions:", error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// });

// weatherRouter.get("/forecast/1day/:locationKey", async (req, res) => {
//     const locationKey = req.params.locationKey;
//     const url = `${BASE_URL}/forecasts/v1/daily/1day/${locationKey}?apikey=${API_KEY}`;
    
//     try {
//         const response = await axios.get<ForecastResult>(url);
//         res.status(200).json(response.data.DailyForecasts[0]);
//     } catch (error) {
//         console.error("Error fetching one-day forecast:", error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// });

// weatherRouter.get("/forecast/5day/:locationKey", async (req, res) => {
//     const locationKey = req.params.locationKey;
//     const url = `${BASE_URL}/forecasts/v1/daily/5day/${locationKey}?apikey=${API_KEY}`;
    
//     try {
//         const response = await axios.get<ForecastResult>(url);
//         res.status(200).json(response.data.DailyForecasts);
//     } catch (error) {
//         console.error("Error fetching five-day forecast:", error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// });

export default weatherRouter;
