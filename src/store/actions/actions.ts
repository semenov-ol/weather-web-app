import { SET_FAVORITE, SET_FOUND_DATA, REMOVE_FAVORITE } from './constatnt';

export const setFoundData = (value: string) => {
  return {
    type: SET_FOUND_DATA,
    value,
  };
};

export const setFavorite = (value: string) => {
  return {
    type: SET_FAVORITE,
    value,
  };
};

export const removeFromFavorite = (value: string) => {
  return {
    type: REMOVE_FAVORITE,
    value,
  };
};
