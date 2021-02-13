import { Avatar, Box, Button } from '@material-ui/core';
import { FC, useMemo } from 'react';
import { state, setFavorite, removeFromFavorite } from '../../store';

import { Weather } from '../../types/weather';

import './city-card.css';

interface CityCardProps {
  data?: Weather;
  isFavorite?: boolean;
}

export const CityCard: FC<CityCardProps> = ({ data, isFavorite }) => {
  const { name, weather, main, wind, sys } = data || {};

  const iconURL = weather?.[0].icon ? `http://openweathermap.org/img/wn/${weather?.[0].icon}@2x.png` : '';

  const sunrise = useMemo(() => sys && new Date(sys?.sunrise * 1000).toLocaleTimeString(), [sys]);
  const sunset = useMemo(() => sys && new Date(sys?.sunset * 1000).toLocaleTimeString(), [sys]);

  const addToFavorite = () => {
    state.dispatch(setFavorite(JSON.stringify(data)));
  };

  const removeFavorite = () => {
    state.dispatch(removeFromFavorite(String(data?.id)));
  };

  return (
    <Box style={{ margin: '40px' }}>
      {data && (
        <div className="city-card">
          <div className="main">
            <div className="title">{name}</div>

            {main?.temp && <div className="temp">{Math.round(main?.temp - 273.15)}°</div>}

            <div className="condition">
              {weather && <Avatar alt={weather?.[0].main} src={iconURL} />}
              {weather?.[0].main}
            </div>
          </div>
          <div className="additional-info">
            <div>
              <div className="additional-info__block">Pressure: {main?.pressure}</div>

              <div className="additional-info__block">Humidity: {main?.humidity}</div>

              <div className="additional-info__block">Wind: {wind?.speed} m/s</div>

              <div className="additional-info__block">Sunrise: {sunrise}</div>

              <div className="additional-info__block">Sunset: {sunset}</div>
            </div>
            <div className="fav">
              {isFavorite ? (
                <Button variant="outlined" onClick={removeFavorite}>
                  Remove from favorite
                </Button>
              ) : (
                <Button variant="outlined" onClick={addToFavorite}>
                  Add to Favorite
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </Box>
  );
};
