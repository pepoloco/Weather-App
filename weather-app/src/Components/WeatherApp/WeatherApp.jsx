import React, { useState } from 'react';
import './WeatherApp.css';
import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import humidity_icon from '../assets/humidity.png';
import snow_icon from '../assets/snow.png';
import rain_icon from '../assets/rain.png';
import wind_icon from '../assets/wind.png';

const WeatherApp = () => {
    let api_key = '82b6d2555fa4a0faf3240d81e35cb76b';
    const [icon, setIcon] = useState(clear_icon);
    const [humidity, setHumidity] = useState('');
    const [windSpeed, setWindSpeed] = useState('');
    const [temperature, setTemperature] = useState('');
    const [location, setLocation] = useState('');

    const fetchData = async (city) => {
        try {
            if (!city) {
                return;
            }

            let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${api_key}`;
            let response = await fetch(url);
            let data = await response.json();

            setHumidity(data.main.humidity);
            setWindSpeed(Math.floor(data.wind.speed));
            setTemperature(Math.floor(data.main.temp));
            setLocation(data.name);

            updateWeatherIcon(data.weather[0].icon);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const updateWeatherIcon = (weatherIcon) => {
        const weatherIcons = {
            '01d': clear_icon,
            '01n': clear_icon,
            '02d': cloud_icon,
            '02n': cloud_icon,
            '03d': drizzle_icon,
            '03n': drizzle_icon,
            '04d': drizzle_icon,
            '04n': drizzle_icon,
            '09d': rain_icon,
            '09n': rain_icon,
            '10d': rain_icon,
            '10n': rain_icon,
            '13d': snow_icon,
            '13n': snow_icon,
        };

        const selectedIcon = weatherIcons[weatherIcon] || clear_icon;
        setIcon(selectedIcon);
    };

    const search = () => {
        const element = document.getElementsByClassName('cityInput');
        const city = element[0].value;
        fetchData(city);
    };

    return (
        <div className="container">
            <div className="top-bar">
                <input
                    type="text"
                    className="cityInput"
                    placeholder="search"
                />
                <div className="search-icon" onClick={search}>
                    <img src={search_icon} alt="" />
                </div>
            </div>
            <div className="weather-image">
                <img src={icon} alt="" />
            </div>
            <div className="weather-temp">{temperature}°C</div>
            <div className="weather-location">{location}</div>
            <div className="data-container">
                <div className="element">
                    <img src={humidity_icon} alt="" className="icon" />
                    <div className="data">
                        <div className="humidity-percent">{humidity}%</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={wind_icon} alt="" className="icon" />
                    <div className="data">
                        <div className="wind-rate">{windSpeed} km/h</div>
                        <div className="text">Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherApp;
