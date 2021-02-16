import { ChangeEvent, FormEvent, useState } from 'react';
import { Button, TextField } from '@material-ui/core';

import { usePosition } from '../utils';
import { WeatherApi } from '../../services';
import { setFoundData, state } from '../../store';

import './form.css';

export const Form = () => {
  const api = new WeatherApi();
  const [city, setCity] = useState('');

  const { position } = usePosition();

  const fetchData = async (city: string) => {
    const response = await api.getWeather(city);
    state.dispatch(setFoundData(response));
  };

  const fetchGeoData = async (lat: number, lon: number) => {
    const response = await api.getGeoWeather(lat, lon);
    state.dispatch(setFoundData(response));
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchData(city);
  };

  const handleLocation = () => {
    fetchGeoData(position?.latitude as number, position?.longitude as number);
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <TextField id="input-city" label="Enter a city" onChange={handleChange} autoComplete="off"></TextField>
          <Button type="submit" color="primary" style={{ marginLeft: '20px' }}>
            Show weather
          </Button>
        </div>
        <Button variant="outlined" onClick={handleLocation}>
          Location Weather
        </Button>
      </form>
    </>
  );
};
