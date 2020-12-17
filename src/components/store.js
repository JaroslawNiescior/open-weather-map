import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { weatherReducer } from '../reducers/weatherReducer';
import { findReducer } from '../reducers/findReducer';

const intitial = { weather: { loading: true } };

const reducer = combineReducers({
    weather: weatherReducer,
    find: findReducer
});

const store = createStore(reducer, intitial, applyMiddleware(thunk));

export default store;