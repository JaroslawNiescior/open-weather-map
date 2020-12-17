import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import './SearchBar.css';
import { getFind, _getWeather } from '../actions';

const SearchBar = () => {
    const [term, setTerm] = useState('');
    const [inputFocus, setInputFocus] = useState(false);
    const [isWriting, setIsWriting] = useState(false);
    const dispatch = useDispatch();
    const { loading, error, data } = useSelector(state => state.find);

    const selectCity = (name, country, lat, lon) => {
        setInputFocus(false);
        setTerm(`${name}, ${country}`);
        dispatch(_getWeather(lat, lon));
    };

    useEffect(() => {
        if (term && inputFocus) {
            const timerId = setTimeout(() => {
                setIsWriting(false);
                dispatch(getFind(term));
            }, 500)
            return () => {
                setIsWriting(true);
                clearTimeout(timerId);
            }
        }
    }, [term, dispatch, inputFocus]);

    const results = (!loading && !error && data && data.count > 0) ?
        data.list.map((item) => (
            <div
                key={item.id}
                className="result-item"
                onClick={() => { selectCity(item.name, item.sys.country, item.coord.lat, item.coord.lon) }}
            >
                <div className="col">{`${item.name}, ${item.sys.country} `}</div>
                <div className="col"><img src={`https://openweathermap.org/images/flags/${(item.sys.country).toLowerCase()}.png`} className="flag" alt="flag" /></div>
                <div className="col">{item.main.temp}°C</div>
                <div className="col"><img src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`} alt="icon" /></div>
                <div className="col">{item.coord.lat}, {item.coord.lon}</div>
            </div >
        ))
        :
        <div className="message empty">
            <div className="header">No Results</div>
            <div className="description">Your search returned no results</div>
        </div>;

    return (
        <div className="ui container">
            <div className="search-bar ui segment">
                <div className={`ui${(loading && isWriting) ? " loading" : ""} ${inputFocus ? "focus " : ""}search`}>
                    <div style={{ width: "100%" }} className="ui icon input">
                        <input
                            className="prompt"
                            type="text"
                            value={term}
                            onChange={(event) => { setTerm(event.target.value) }}
                            onFocus={() => { setInputFocus(true) }}
                            // onBlur={() => { setInputFocus(false) }}
                            placeholder="Search cities ..."
                        />
                        <i className="search icon" />
                    </div>
                    <div style={{ width: "100%" }} className={`results transition ${(inputFocus && !isWriting && term) ? "visible" : "hidden"}`}>{results}</div>
                </div>
            </div>
        </div>
    );
};


export default SearchBar;
