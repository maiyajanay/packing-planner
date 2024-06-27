import axios from "axios";

export function fetchAll(): Promise<Weather[]> {
    return axios
        .get<{ properties: WeatherProperty }>("https://api.weather.gov/gridpoints/DTX/65,33/forecast")
        .then(response => response.data.properties.periods);
}