import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState({});
  const [city, setCity] = useState('');

  const apiKey = '935f915ac540f41510e974ae3521bbe6';

  const fetchWeather = (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    axios.get(url)
      .then((response) => {
        setWeatherData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  };

  const handleSearch = (event) => {
    event.preventDefault();
    fetchWeather(city);
  };

  return (
    <div className='app'>
      <div className='container'>
        <form onSubmit={handleSearch} className='search-box'>
          <input 
            type="text" 
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city" 
          />
          <button type="submit">Search</button>
        </form>
        <div className='top'>
          <div className='location'>
            <p>{weatherData.name}</p>
          </div>
          <div className='temp'>
            {weatherData.main && <h1>{weatherData.main.temp}°F</h1>}
          </div>
          <div className='description'>
            {weatherData.weather && <p>{weatherData.weather[0].description}</p>}
          </div>
        </div>
        <div className='bottom'>
          <div className='feels'>
            {weatherData.main && <p className='bold'>{weatherData.main.feels_like}°F</p>}
            <p>Feels Like</p>
          </div>
          <div className='humidity'>
            {weatherData.main && <p>{weatherData.main.humidity}%</p>}
            <p>Humidity</p>
          </div>
          <div className='wind'>
            {weatherData.wind && <p>{weatherData.wind.speed} MPH</p>}
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
