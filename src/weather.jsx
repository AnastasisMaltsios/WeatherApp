import React, {useState} from "react";
import axios from "axios";

export default function Weather() {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);

    async function fetchData() {
        try {
            const apiKey = import.meta.env.VITE_API_KEY;
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`);   
        setWeather(response.data);
        console.log(response.data);
        } catch (error) {
            setError("City not found, please try again.")
         console.log(error);    
        }
    }
    
    function clickHandle(event) {
        event.preventDefault();
        setWeather('');
        setError('');
        setCity('');
        fetchData();
    }
    return (
        <div className="container">
            <h1 className="title">Weather App</h1>
          <form onSubmit={clickHandle}>
            <div className="input-container">
                <input className="input"
              type="text"
              placeholder="Enter city name"
              value={city}
              onChange={(event) => setCity(event.target.value)}
            /></div>
            
            <button className="search-button"type="submit">Get Weather</button>
            {error && <p className="error-message">{error}</p>}
          </form>
          {weather && (
            <div className="weather-info">
              <h2 className="city-name">{weather.name}, {weather.sys.country}</h2>
              <p className="description">{weather.weather[0].description.toUpperCase()}</p>
              <p className="temperature">Temperature: {weather.main.temp} °C</p>
            </div>
          )}
        </div>
      );
    };