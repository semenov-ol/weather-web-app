import { WeatherObject } from '../weather/parts';

export interface GeoWeather {
  name: string;
  id: number;
  weather: WeatherObject[];
  main: {
    temp: number;
    pressure: number;
    humidity: number;
  };
  wind: { speed: number };
  sys: {
    sunrise: number;
    sunset: number;
  };
}
