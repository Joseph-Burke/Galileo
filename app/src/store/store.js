import reducer from '../reducers/reducer';
import fetchData from '../helpers/fetchData';
import { createStore } from 'redux';

const initialState = fetchData();

const store = createStore(reducer, initialState);

export default store;