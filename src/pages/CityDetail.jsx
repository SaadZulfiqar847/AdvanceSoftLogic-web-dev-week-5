import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useWeather } from '../hooks/useWeather';
import WeatherResult from '../components/WeatherResult';
import ForecastList from '../components/ForecastList';

function CityDetail() {
  const { cityName } = useParams();
  const navigate = useNavigate();
  const [unit, setUnit] = useState('celsius');

  // The URL segment was encoded when we built the Link in Cities.jsx
  // (spaces, special characters), so it needs decoding before being
  // used as a real search term.
  const decodedCityName = decodeURIComponent(cityName);

  const { location, weatherData, loading, error } = useWeather(decodedCityName);

  function handleToggleUnit() {
    setUnit((prev) => (prev === 'celsius' ? 'fahrenheit' : 'celsius'));
  }

  return (
    <div className="city-detail-page">
      <button className="back-link" onClick={() => navigate('/cities')}>
        ← Back to Cities
      </button>

      {loading && (
        <section className="loading-state">
          <div className="weather-loader" aria-label="Loading weather data">
            <span className="loader-sun"></span>
            <span className="loader-cloud"></span>
          </div>
          <p>Reading the sky...</p>
        </section>
      )}

      {error && (
        <div className="page-status error-message">
          <p>{error}</p>
          <Link to="/cities">Back to Cities</Link>
        </div>
      )}

      {!loading && !error && weatherData && location && (
        <>
          <WeatherResult
            location={location}
            weatherData={weatherData}
            unit={unit}
            onToggleUnit={handleToggleUnit}
          />
          <ForecastList daily={weatherData.daily} unit={unit} />
        </>
      )}
    </div>
  );
}

export default CityDetail;