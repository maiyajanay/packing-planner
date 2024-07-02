export interface WeatherProperty {
  properties: Weather[];
}

export interface Weather {
  location: string;
  date: number;
  tempMin: number;
  tempMax: number;
  temperatureUnit: string;
  icon: string;
  hasPrecipitation: boolean;
}
