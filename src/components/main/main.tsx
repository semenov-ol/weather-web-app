import { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Container, Button } from '@material-ui/core';
import { Favorites } from '../favorites';

import { Form } from '../form';
import { CityCard } from '../city-card';

import { state } from '../../store';
import { Weather } from '../../types/weather';

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
    () => Boolean(favorites?.filter((item) => JSON.parse(item).id === data?.id)?.length),
    [favorites, data]
  );

  return (
    <Container>
      <Router>
        <div>
          <nav>
            <ul className="nav-list">
              <li>
                <Link to="/" className="nav-link">
                  <Button  variant="contained" color="primary">Main</Button>
                </Link>
              </li>

              <li>
                <Link to="/favorite" className="nav-link">
                  <Button  variant="contained" color="primary">Favorite</Button>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <Switch>
          <Route exact path="/">
            <Form />

            {data?.cod === 200 ? (
              <CityCard data={data} isFavorite={checkIfFavorite()} />
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
