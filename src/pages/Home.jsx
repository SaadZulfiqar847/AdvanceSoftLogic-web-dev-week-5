import { useState } from 'react';
import { useWeather } from '../hooks/useWeather';
import SearchForm from '../components/SearchForm';
import WeatherResult from '../components/WeatherResult';
import ForecastList from '../components/ForecastList';

function Home() {
  const [searchedCity, setSearchedCity] = useState('');
  const [unit, setUnit] = useState('celsius');

  const { location, weatherData, loading, error } = useWeather(searchedCity);

  function handleSearch(cityName) {
    setSearchedCity(cityName);
  }

  function handleToggleUnit() {
    setUnit((prev) => (prev === 'celsius' ? 'fahrenheit' : 'celsius'));
  }

  return (
    <div className="home-page">
      <header className="app-header">
        <h1>Weather Dashboard</h1>
        <p className="tagline">A quiet read on the sky, wherever you're looking.</p>
      </header>

      <SearchForm onSearch={handleSearch} />

      {loading && (
        <section className="loading-state">
          <div className="weather-loader" aria-label="Loading weather data">
            <span className="loader-sun"></span>
            <span className="loader-cloud"></span>
          </div>
          <p>Reading the sky...</p>
        </section>
      )}

      {error && <p className="page-status error-message">{error}</p>}

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

      {!loading && !error && !weatherData && searchedCity === '' && (
        <p className="page-status">Search a city to see its weather, or browse the Cities page.</p>
      )}
    </div>
  );
}

export default Home;