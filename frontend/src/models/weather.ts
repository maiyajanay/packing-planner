export interface WeatherProperty {
  properties: Weather[];
}

export interface Weather {
  Temperature: {
    Minimum: {
      Value: number;
      Unit: string;
    };
    Maximum: {
      Value: number;
      Unit: string;
    };
  };
  Day: {
    Icon: number;
    IconPhrase: string;
    HasPrecipitation: boolean;
    PrecipitationType?: string;
    PrecipitationIntensity?: string;
  };
  Night: {
    Icon: number;
    IconPhrase: string;
    HasPrecipitation: boolean;
    PrecipitationType?: string;
    PrecipitationIntensity?: string;
  };
}

// location: string;
// date: number;
// tempMin: number;
// tempMax: number;
// temperatureUnit: string;
// icon: string;
// hasPrecipitation: boolean;
