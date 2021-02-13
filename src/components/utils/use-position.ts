import { useEffect, useState } from 'react';

export const usePosition = () => {
  const [position, setPosition] = useState<{ latitude: number; longitude: number }>();
  const [error, setError] = useState('');

  const onChange: PositionCallback = ({ coords: { latitude, longitude } }) => {
    setPosition({ latitude, longitude });
  };

  const onError = (error: GeolocationPositionError) => {
    setError(error.message);
  };

  useEffect(() => {
    const geo = navigator.geolocation;

    if (!geo) {
      setError('Геолокация не поддерживается браузером');
      return;
    }

    const watcher = geo.watchPosition(onChange, onError);

    return () => geo.clearWatch(watcher);
  }, []);

  return { position, error };
};
