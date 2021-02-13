import { FC } from 'react';
import { CityCard } from '../city-card';

interface FavoritesProps {
  data?: string[];
}

export const Favorites: FC<FavoritesProps> = ({ data }) => {
  return (
    <div>
      {data?.map((item) => {
        return <CityCard key={Math.random()} data={JSON.parse(item)} isFavorite={true} />;
      })}
    </div>
  );
};
