export interface WeatherProperty {
  properties: Weather[];
}

export interface Weather {
	Date: string;
	Temperature: {
		Minimum: {
			Value: number;
      Unit: string;
		};
		Maximum: {
			Value: number;
      Unit: string;
		}
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
	}
}