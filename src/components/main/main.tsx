import { useCallback, useEffect, useState, useMemo } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { Button, Container } from '@material-ui/core';

import { Form } from '../form';
import { state } from '../../store';
import { Weather } from '../../types';
import { CityCard } from '../city-card';
import { Favorites } from '../favorites';

import './main.css';

export const Main = () => {
  const [data, setData] = useState<Weather>();
  const [favorites, setFavorites] = useState<string[]>();

  useEffect(() => {
    state.subscribe(() => {
      setFavorites(state.getState()?.fav);
      setData(JSON.parse(state.getState()?.value || ''));
    });
  }, []);

  const checkIfFavorite = useCallback(
    () =>
      Boolean(
        favorites?.filter((item) => {
          const dataItem = JSON.parse(item);
          return dataItem.id === data?.id || dataItem.id === data?.current?.weather[0].id;
        })?.length
      ),
    [favorites, data]
  );

  const mappedData = useMemo(
    () =>
      typeof data?.timezone === 'string'
        ? {
            name: data.timezone,
            weather: [data.current.weather[0]],
            main: { temp: data.current.temp, pressure: data.current.pressure, humidity: data.current.humidity },
            wind: { speed: data.current.wind_speed },
            sys: {
              sunrise: data.current.sunrise,
              sunset: data.current.sunset,
            },
            id: data.current.weather[0].id,
          }
        : data,
    [data]
  );

  return (
    <Container>
      <Router>
        <div>
          <nav>
            <ul className="nav-list">
              <li>
                <Link to="/" className="nav-link">
                  <Button variant="contained" color="primary">
                    Search
                  </Button>
                </Link>
              </li>

              <li>
                <Link to="/favorite" className="nav-link">
                  <Button variant="contained" color="primary">
                    Favorite
                  </Button>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <Switch>
          <Route exact path="/">
            <Form />

            {data?.cod === 200 || data?.current ? (
              <CityCard data={mappedData} isFavorite={checkIfFavorite()} />
            ) : (
              <div className="error">{data?.message}</div>
            )}
          </Route>

          <Route path="/favorite">
            <Favorites data={favorites} />
          </Route>
        </Switch>
      </Router>
    </Container>
  );
};
