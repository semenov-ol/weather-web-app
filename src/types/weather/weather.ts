import { Coord, Main, Sys, WeatherObject, Wind } from './parts';

export interface Weather {
  coord: Coord;
  weather: WeatherObject[];
  main: Main;
  wind: Wind;
  sys: Sys;
  clouds: {
    all: number;
  };
  base: string;
  dt: number;
  visibility: number;
  timezone: number | string;
  id: number;
  name?: string;
  cod: number;
  message: string;
  current: {
    temp: number;
    weather: WeatherObject[];
    sunrise: number;
    sunset: number;
    humidity: number;
    pressure: number;
    wind_speed: number;
  };
}
