import { createStore } from 'redux';
import { reducer } from '../reducer';

let state = createStore(reducer);

export { state };
