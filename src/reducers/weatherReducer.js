import { FETCH_WEATHER_FAIL, FETCH_WEATHER_REQUEST, FETCH_WEATHER_SUCCESS } from '../constants';

const weatherReducer = (state = {}, action) => {
    switch (action.type) {
        case FETCH_WEATHER_REQUEST:
            return { loading: true }
        case FETCH_WEATHER_SUCCESS:
            return { loading: false, data: action.payload, error: false }
        case FETCH_WEATHER_FAIL:
            console.log("FETCH_WEATHER_FAIL:", action.payload);
            return { loading: false, data: action.payload.data, error: action.payload.error }
        default:
            return state
    }
}

export { weatherReducer }