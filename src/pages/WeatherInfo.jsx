import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_KEY = "9ccf57795bd34252b5c145601241906";

function WeatherInfo({ addHistory }) {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Add error state
  const navigate = useNavigate();

  async function fetchWeather() {
    setLoading(true);

    setError(null); // Reset error state before fetching
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=8`;
    try {
      const response = await axios.get(url);
      setWeather(response.data);
      addHistory(city);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching weather data", error);
      setError("Could not fetch weather data. Please try again."); // Set error message
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="headline">WEATHER</div>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
        className="inputBtn"
      />
      <button onClick={fetchWeather} disabled={loading} className="searchBtn">
        {loading ? "Loading..." : "Search"}
      </button>
      <button onClick={() => navigate("/history")} className="historybtn">History</button>
      
      {error && <p>{error}</p>} {/* Render error message if there's an error */}

      {weather && (
        <div className="sectionInfo">
          <h3>Weather in {weather.location.name}</h3>
          <p>{weather.current.condition.text}</p>
          <p>Temperature: {weather.current.temp_c}°C</p>
          <h4>7-Day Forecast</h4>
          <div className="forecast-grid">
            {weather.forecast.forecastday.map((day, index) => (
              <div className="forecast-card" key={index}>
                <p>{day.date}</p>
                <p>{day.day.condition.text}</p>
                <p>Max Temp: {day.day.maxtemp_c}°C</p>
                <p>Min Temp: {day.day.mintemp_c}°C</p>
                <img src={day.day.condition.icon} alt={day.day.condition.text} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherInfo;
