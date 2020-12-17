import jsonPlaceholder from '../apis/jsonPlaceholder';
import * as constants from '../constants';

const getWeather = (city) => (dispatch, getState) => {
    const { weather: { data } } = getState();
    dispatch({ type: constants.FETCH_WEATHER_REQUEST });

    jsonPlaceholder.get(`/weather?q=${city}&appid=${constants.WEATHER_API}&units=metric`)
        .then(responseWeather => {
            jsonPlaceholder.get(`/onecall?lat=${responseWeather.data.coord.lat}&lon=${responseWeather.data.coord.lon}&appid=${constants.WEATHER_API}&units=metric`)
                .then(response => {
                    dispatch({ type: constants.FETCH_WEATHER_SUCCESS, payload: { weather: responseWeather.data, onecall: response.data, } });
                }).catch(error => {
                    dispatch({ type: constants.FETCH_WEATHER_FAIL, payload: { data: data, error: error.message } });
                })
        }).catch(error => {
            dispatch({ type: constants.FETCH_WEATHER_FAIL, payload: { data: data, error: error.message } });
        })
};

const _getWeather = (lat, lon) => (dispatch, getState) => {
    const { weather: { data } } = getState();
    dispatch({ type: constants.FETCH_WEATHER_REQUEST });

    jsonPlaceholder.get(`/weather?lat=${lat}&lon=${lon}&appid=${constants.WEATHER_API}&units=metric`)
        .then(responseWeather => {
            jsonPlaceholder.get(`/onecall?lat=${responseWeather.data.coord.lat}&lon=${responseWeather.data.coord.lon}&appid=${constants.WEATHER_API}&units=metric`)
                .then(response => {
                    dispatch({ type: constants.FETCH_WEATHER_SUCCESS, payload: { weather: responseWeather.data, onecall: response.data, } });
                }).catch(error => {
                    dispatch({ type: constants.FETCH_WEATHER_FAIL, payload: { data: data, error: error.message } });
                })
        }).catch(error => {
            dispatch({ type: constants.FETCH_WEATHER_FAIL, payload: { data: data, error: error.message } });
        })
};

const getFind = (term) => (dispatch, getState) => {

    const { find: { data } } = getState();
    dispatch({ type: constants.FETCH_FIND_REQUEST });

    jsonPlaceholder.get(`/find?q=${term}&appid=${constants.WEATHER_API}&units=metric`)
        .then(response => {
            dispatch({ type: constants.FETCH_FIND_SUCCESS, payload: response.data });
        }).catch(error => {
            dispatch({ type: constants.FETCH_FIND_FAIL, payload: { data: data, error: error.message } });
        })
};

export { getWeather, _getWeather, getFind }