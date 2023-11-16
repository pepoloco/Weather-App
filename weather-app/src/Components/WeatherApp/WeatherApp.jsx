import React from 'react'
import './WeatherApp.css'
import search_icon from "../assets/search.png"
import clear_icon from "../assets/clear.png"
import cloud_icon from "../assets/cloud.png"
import drizzle_icon from "../assets/drizzle.png"
import humidity_icon from "../assets/humidity.png"
import snow_icon from "../assets/snow.png"
import rain_icon from "../assets/rain.png"
import wind_icon from "../assets/wind.png"

const WeatherApp = () => {
    let api_key = "82b6d2555fa4a0faf3240d81e35cb76b";

    const search = async () => {
        const element = document.getElementsByClassName('cityInput');
        if (element[0].value === "") {
            return 0;
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${elemet[0].value}&appid=${api_key}`;
        let response = await fetch(url);
        let data = await response.json();
        const humidity = document.getElementsByClassName("humidity-percent");
        const wind = document.getElementsByClassName("wind-rate");
        const temperature = document.getElementsByClassName('weather-temp');
        const location = document.getElementsByClassName('weather-location');

        humidity[0].innerHTML = data.main.humidity;
        wind[0].innerHTML = data.wind.speed;
        temperature[0].innerHTML = data.main.temp;
        location[0].innerHTML = data.name;

    }
    return (
        <div className='container'>
            <div className="top-bar"></div>
            <input type="text" className="cityInput" placeholder='search' />
            <div className="search-icon" onClick={() => { search() }}>
                <img src={search_icon} alt="" />
            </div>
            <div className="weather-image">
                <img src={cloud_icon} alt='' />
            </div>
            <div className="weather-temp">24c</div>
            <div className="weather-location">London</div>
            <div className="data-container"></div>
            <div className="element">
                <img src={humidity_icon} alt='' className='icon' />
                <div className='data'>
                    <div className='humidity-percent'>64%</div>
                    <div className='text'>Humidity</div>
                </div>
            </div>
            <div className="element">
                <img src={wind_icon} alt='' className='icon' />
                <div className='data'>
                    <div className='wind-rate'>18 km/h</div>
                    <div className='text'>Wind Speed</div>
                </div>
            </div>
        </div>
    )
}

export default WeatherApp