import React, { useEffect } from 'react';
import './Weather.css';
import { useDispatch, useSelector } from 'react-redux';
import { getWeather, _getWeather } from '../actions';
import sunrise from '../assets/img/sunrise.png';
import sun from '../assets/img/sun.png'
import moon from '../assets/img/moon.png'

const Weather = () => {
    const { loading, error, data } = useSelector(state => state.weather);
    const dispatch = useDispatch();

    useEffect(() => {
        const successFunction = (position) => {
            dispatch(_getWeather(position.coords.latitude, position.coords.longitude));
        }

        const errorFunction = () => {
            alert('It seems like Geolocation, which is required for this page, is not enabled in your browser. Please use a browser which supports it.');
            dispatch(getWeather("London"));
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
        } else {
            errorFunction();
        }
    }, [dispatch]);

    useEffect(() => {
        if (data && !error) {
            let isMouseDown = false;
            let startX;
            let scrollLeft;
            const slider = document.querySelector('.slider');
            slider.addEventListener('mousedown', (e) => {
                isMouseDown = true;
                startX = e.pageX - slider.offsetLeft;
                scrollLeft = slider.scrollLeft;
            });

            slider.addEventListener('mouseleave', () => {
                isMouseDown = false;
            });

            slider.addEventListener('mouseup', () => {
                isMouseDown = false;
            });

            slider.addEventListener('mousemove', (e) => {
                if (!isMouseDown) return;
                e.preventDefault();
                const x = e.pageX - slider.offsetLeft;
                const walk = (x - startX) * 2;
                slider.scrollLeft = scrollLeft - walk;
            });
        }
    }, [loading, error, data]);


    return (
        loading
            ?
            <div className="ui inverted active dimmer">
                <div className="ui large text loader">Loading...</div>
            </div>
            :
            <div className="ui transition container weather">
                <div className="ui segment">
                    <h1 className="ui center header">{`${data.weather.name}, ${data.weather.sys.country}`}</h1>
                    <div className="slider">
                        {/* data.slice(startIndex, endIndex) */}
                        {data.onecall.daily.slice(0, 5).map((day, index) => (
                            <div key={index} className="card">
                                <img className="weather-icon" src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png`} alt="icon" />
                                <h2 className="ui header">
                                    {new Date(day.dt * 1000).toLocaleDateString()}
                                </h2>
                                <div className="prop"><img src={sunrise} alt="icon" />{day.temp.morn}&#8451;</div>
                                <div className="prop"><img src={sun} alt="icon" />{day.temp.day}&#8451;</div>
                                <div className="prop"><img src={moon} alt="icon" />{day.temp.night}&#8451;</div>
                                <div className="prop"><strong>Humidity:</strong> {day.humidity}%</div>
                                <div className="prop"><strong>Min:</strong> {day.temp.min} &#8451;</div>
                                <div className="prop"><strong>Max:</strong> {day.temp.max} &#8451;</div>
                                <div className="prop"><strong>Mean:</strong> {day.temp.eve} &#8451;</div>


                            </div>
                        ))}
                        {/* fix scrolling problem */}
                        <div>&nbsp;</div>
                    </div>
                </div>
            </div>

    )
}

export default Weather