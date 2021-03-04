import reducer from '../reducers/reducer';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

const initialState = [];
const store = createStore(
  reducer,
  initialState,
  applyMiddleware(thunkMiddleware)
);

export default store;