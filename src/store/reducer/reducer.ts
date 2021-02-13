import { Reducer } from 'redux';

import { REMOVE_FAVORITE, SET_FAVORITE, SET_FOUND_DATA } from '../actions';

const initialState = { fav: [], value: '' };

export const reducer: Reducer<
  { fav: string[]; value: string | undefined } | undefined,
  { type: string; value: string }
> = (state = initialState, action) => {
  switch (action.type) {
    case SET_FOUND_DATA:
      return { fav: state?.fav, value: action.value };
    case SET_FAVORITE:
      return { fav: [...state?.fav, action.value], value: state?.value };
    case REMOVE_FAVORITE: {
      const removeIndex = state.fav.indexOf(
        state.fav.find((item) => String(JSON.parse(item).id) === action.value) || ''
      );
      if (removeIndex > -1) {
        return {
          value: state?.value,
          fav: [...state.fav.slice(0, removeIndex), ...state.fav.slice(removeIndex + 1)],
        };
      }
      return state;
    }
  }
};
