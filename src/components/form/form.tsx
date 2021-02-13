import { ChangeEvent, FormEvent, useState } from 'react';
import { Button, TextField } from '@material-ui/core';

import { WeatherApi } from '../../services';
import { setFoundData, state } from '../../store';

export const Form = () => {
  const [city, setCity] = useState('');

  const fetchData = async (city: string) => {
    const api = new WeatherApi();
    const response = await api.getWether(city);
    state.dispatch(setFoundData(response));
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchData(city);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField id="input-city" label="Enter a city" onChange={handleChange} autoComplete="off"></TextField>
      <Button type="submit" color="primary" style={{ marginLeft: '20px' }}>
        Show weather
      </Button>
    </form>
  );
};
